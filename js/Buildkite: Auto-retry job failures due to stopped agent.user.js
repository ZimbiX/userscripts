// ==UserScript==
// @name         Buildkite: Auto-retry job failures due to stopped agent
// @namespace    http://tampermonkey.net/
// @version      2024-09-16
// @description  try to take over the world!
// @author       You
// @match        https://buildkite.com/jobready/rto/builds/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=buildkite.com
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ZimbiX/userscripts/master/js/Buildkite%3A%20Auto-retry%20job%20failures%20due%20to%20stopped%20agent.user.js
// ==/UserScript==

(function() {
    'use strict';

    const isLastChild = (e) => (e === e.parentNode.children[e.parentNode.children.length-1]);

    const retryFailedJobs = () => {
        // Expand all retryable failed jobs to populate exit status and retry button
        const failedJobHeadersUnexpanded = document.querySelectorAll('.build-details-pipeline-job-state-failed:not(.build-details-pipeline-job-expanded) > .build-details-pipeline-job__header');
        const failedJobHeadersToExpand = Array.from(failedJobHeadersUnexpanded).filter((header) => {
            // When a job has retries, it gets wrapped with a job-retry-group
            // Exclude failed jobs that have previously been retried (jobs in a retry group that aren't the last one in it)
            if (header.parentNode.parentNode.classList.contains('job-retry-group')) {
                return isLastChild(header.parentNode);
            } else {
                return true;
            };
        });
        //console.log('Expanding unexpanded retryable failed jobs:', failedJobHeadersToExpand);
        failedJobHeadersToExpand.forEach(header => header.click());

        // Filter to jobs that failed due to a stopped agent
        const exitStatusLines = document.querySelectorAll('.JobLogComponent__ExitStatus');
        const exitStatusLinesForStoppedAgent = Array.from(exitStatusLines).filter(line => line.textContent == 'Exited with status 255 (after intercepting the agent’s termination signal, sent because the agent was stopped)');

        // Click retry button for those jobs
        exitStatusLinesForStoppedAgent.forEach((exitStatusLineForStoppedAgent) => {
            const retryButton = exitStatusLineForStoppedAgent.closest('.build-details-pipeline-job-body').querySelector('.build-details-pipeline-job-body__actions a[href$="/retry"]');
            if (retryButton.innerText == 'Retry') {
                console.log('Retrying', retryButton);
                retryButton.click();
            };
        });

        // Undo the expansion we did earlier
        // failedJobHeadersToExpand.forEach(header => header.click());
    };

    const loopRetryFailedJobs = () => {
        setTimeout(() => {
            retryFailedJobs();
            loopRetryFailedJobs();
        }, 100);
    };

    loopRetryFailedJobs();
})();