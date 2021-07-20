import * as React from "react";

import { logger } from "../helpers/logger";

const moduleName = 'JobLinks';
let log = logger(moduleName);
log({ logType: 'LOADED' });




// @ts-ignore
export const JobLinks = ({ jobId, accountId, seoJobId }) => {

    // todo - replace with prod urls
    const nextProdUrl = 'https://admin.mwwnextappprod-us.monster-next.com';
    const nextPreprodUrl = 'https://admin.mwwnextapppreprod-us.monster-next.com';
    const nextJob = `${nextPreprodUrl}/jobs/search?page=1&query=${jobId}&type=jobId`;
    const nextAccount = `${nextPreprodUrl}/accounts/search?page=1&query=${accountId}&type=accountId`;
    const nowUrl = 'https:/';
    const nowJob = `${nowUrl}/`;
    const nowAccount = `${nowUrl}/`;

    // todo - all domains
    const domain = 'https://www.monster.com';

    // todo
    const orgName ='Monster';

    const jobDetail = `${domain}/job-openings/${seoJobId}#/`;
    const searchId = `${domain}/jobs/search?id=${jobId}&page=1#/`;
    const orgJobs = `${domain}/jobs/search?cn=${orgName}#/`;

    return (
        <section>
            {jobId && <p>
                View <strong><a href={jobDetail} target='_blank'  style={{color: '#007bff'}}>Job detail</a></strong>
            </p>}
            {jobId && <p>
                Search using this <strong><a href={searchId} target='_blank'  style={{color: '#007bff'}}>job id</a></strong>
            </p>}
            {false && <p>
                Search all <strong><a href={orgJobs} target='_blank'  style={{color: '#007bff'}}>Org jobs</a></strong>
            </p>}



            {jobId && <p>
                Open Job in <strong><a href={nextJob} target='_blank'  style={{color: '#007bff'}}>Next Admin</a></strong>
            </p>}
            {false &&  <p>
                Open employer account in <strong><a href={nextAccount} target='_blank' style={{color: '#007bff'}}>Next Admin</a></strong>
            </p>}

            // todo!
            {false && <p>
                Open Job in <strong><a href={nowJob} target='_blank' style={{color: '#007bff'}}>NOW webadmin</a></strong>
            </p>}
            {false && <p>
                Open employer account in <strong><a href={nowAccount} target='_blank' style={{color: '#007bff'}}>NOW webadmin</a></strong>
            </p>}
        </section>
    );
};