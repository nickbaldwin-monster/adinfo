import * as React from "react";

// @ts-ignore
export const JobLinks = ({ jobId, accountId, seoJobId, nowId, url, isNext }) => {

    // todo ?
    // nowId is empty string, single id or multiple ids, for now just take first? id for webadmin link
    let firstNowId = '';
    firstNowId = nowId ? nowId.split(', ')[0] : '';

    // todo - replace with prod urls
    const nextProdUrl = 'https://admin.mwwnextappprod-us.monster-next.com';
    const nextPreprodUrl = 'https://admin.mwwnextapppreprod-us.monster-next.com';
    const nextJob = `${nextProdUrl}/jobs/search?page=1&query=${jobId}&type=jobId`;
    const nextAccount = `${nextProdUrl}/accounts/search?page=1&query=${accountId}&type=accountId`;
    const webAdmin = `https://webadmin.monster.com/recruiters/Jobs.aspx?frmaction=search&AllUsers=1&txtSearchJobs=${firstNowId}&EmailAddress=&ebill=&ebilltype=&button=&txtSearch=${firstNowId}&Submit=Go!&searchtype=POSITIONADID&source=&UserSearchType=`;
    //                https://webadmin.monster.com/recruiters/Jobs.aspx?frmaction=search&AllUsers=1&txtSearchJobs=230302770&EmailAddress=&ebill=&ebilltype=&button=&txtSearch=230302770&Submit=Go!&searchtype=POSITIONADID&source=&UserSearchType=

    // const nowJob = `${nowUrl}${nowId}`;
    // const nowAccount = `${nowUrl}/`;

    // todo - all domains
    const domain = 'https://www.monster.com';
    const orgName ='Monster';
    const orgJobs = `${domain}/jobs/search?cn=${orgName}#/`;


    let regex = /(http(s)?)?:\/\/(www\.)monster(board)?\.[a-z]{2,3}(\.[a-z]{2,3})?(\/[a-z]{2})?\/[a-z]*\/[a-z]*\?q=/ig;

    let href = window.location.href;

    let test = ".lu/de/jobs/suche?q=";

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