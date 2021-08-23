import * as React from "react";

import { logger } from "../helpers/logger";

const moduleName = 'JobLinks';
let log = logger(moduleName);
log({ logType: 'LOADED' });




// @ts-ignore
export const JobLinks = ({ jobId, accountId, seoJobId, nowId, url, isNext }) => {

    // todo - replace with prod urls
    const nextProdUrl = 'https://admin.mwwnextappprod-us.monster-next.com';
    const nextPreprodUrl = 'https://admin.mwwnextapppreprod-us.monster-next.com';
    const nextJob = `${nextProdUrl}/jobs/search?page=1&query=${jobId}&type=jobId`;
    const nextAccount = `${nextProdUrl}/accounts/search?page=1&query=${accountId}&type=accountId`;
    const webAdmin = `https://webadmin.monster.com/recruiters/Jobs.aspx?frmaction=search&AllUsers=1&txtSearchJobs=${nowId}&EmailAddress=&ebill=&ebilltype=&button=&txtSearch=${nowId}&Submit=Go!&searchtype=POSITIONADID&source=&UserSearchType=`;
    //                https://webadmin.monster.com/recruiters/Jobs.aspx?frmaction=search&AllUsers=1&txtSearchJobs=230302770&EmailAddress=&ebill=&ebilltype=&button=&txtSearch=230302770&Submit=Go!&searchtype=POSITIONADID&source=&UserSearchType=
    // const oldWebAdmin = "https://webadmin.monster.com/recruiters/Jobs.aspx?frmaction=search&AllUsers=1&searchtype=POSITIONADID&txtSearch=" + nowId;


    // const nowJob = `${nowUrl}${nowId}`;
    // const nowAccount = `${nowUrl}/`;

    // todo - all domains
    const domain = 'https://www.monster.com';

    // todo
    const orgName ='Monster';

    const jobDetail = `${domain}/job-openings/${seoJobId}#/`;
    const searchId = `${domain}/jobs/search?id=${jobId}&page=1#/`;
    const orgJobs = `${domain}/jobs/search?cn=${orgName}#/`;




    let regex = /(http(s)?)?:\/\/(www\.)monster(board)?\.[a-z]{2,3}(\.[a-z]{2,3})?(\/[a-z]{2})?\/[a-z]*\/[a-z]*\?q=/ig;

    let colo = /\.([a-z]{2,3)}\/[a-z]{2}\/[a-z]*\/[a-z]*\?q=/ig;
    let co = /\.([a-z]{2,3})\/[a-z]*\/[a-z]*\?q=/ig;

    let href = window.location.href;
    // let s = "https://www.monster.ie/jobs/search?q=Software+Engineer&where=#/"
    let test = ".lu/de/jobs/suche?q=";

    let id = '';
    let searchUrl = '';
    let search = href.match(regex);
    if (search) {
        searchUrl = search[0].replace(/q=$/, 'id=') + jobId + "#/";
    }


    const copyWebAdminUrl = async () => {
        try {
            await navigator.clipboard.writeText(webAdmin);
            console.log('copied');
        }
        catch (err) {
            console.error('copy failed: ', err);
        }
    }
      const copySomething = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('copied');
        }
        catch (err) {
            console.error('copy failed: ', err);
        }
    }


    return (
        <section>
            {jobId && <p>
                View <strong><a href={url} target='_blank'  style={{color: '#007bff'}}>Job detail</a></strong>
            </p>}
            {search && <p>
                Search using this <strong><a href={searchUrl} target='_blank'  style={{color: '#007bff'}}>job id</a></strong>
            </p>}


            {jobId && isNext && <p>
                Open Job in <strong><a href={nextJob} target='_blank'  style={{color: '#007bff'}}>Next Admin</a></strong>
            </p>}


            {nowId && <p>
                {/* Open Job in <strong><a href={webAdmin} target='_blank' style={{color: '#007bff'}}>NOW webadmin</a></strong> */}
                CLick to copy <span className='copyText' onClick={copyWebAdminUrl}><strong>WebAdmin URL</strong></span>
            </p>}




            {false && <p>
                Search all <strong><a href={orgJobs} target='_blank'  style={{color: '#007bff'}}>Org jobs</a></strong>
            </p>}


            {false &&  <p>
                Open employer account in <strong><a href={nextAccount} target='_blank' style={{color: '#007bff'}}>Next Admin</a></strong>
            </p>}
        </section>
    );
};