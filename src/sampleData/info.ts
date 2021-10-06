let JOBIDS = {
    "jobId": "30c44760-a0b3-48a2-9fd1-65e534800fb9",
    "externalIdentifiers": [
        {
            "identifierName": "NOW_POSTING_ID",
            "identifierValue": "775ae33e-0c06-4625-88ff-8bc668fbb6b7"
        },
        {
            "identifierName": "POSITION_AD_ID",
            "identifierValue": "230270489"
        },
        {
            "identifierName": "POSITION_AD_ID",
            "identifierValue": "230270490"
        }
    ],
    "seoJobId": "senior-lamp-software-engineer-100-remote-boston-ma--30c44760-a0b3-48a2-9fd1-65e534800fb9",
    "_gctsid": "d4b216fb-f3c5-435d-9f66-e1fea1e53819:APAb7IQCY34LVRK/WxBrydsbHS8oTG/PQA==",
}





let DATES = {
    "jobPosting": {
    "datePosted": "2021-04-22T11:35:13.844Z", // after validation, processing etc?
        "validThrough": "2021-09-05T06:00:10.723Z" // optional
    },
    "createdDate": "2021-04-21T07:55:26.68Z", // time of submission (at/before ingestion and processing)?
    "formattedDate": "2021-04-22T00:00:00", // from datePosted?
    "dateRecency": "30+ days ago", // calculated from?
    "enrichments": {
        "googleSyntheticValidThrough": "2022-06-15T16:17:58.383690Z"
    }

    // note 'activationDate' to be added soon
}


let LOCATIONS = {
    "jobPosting": {
        "jobLocation": [
            {
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Boston",
                    "addressRegion": "MA",
                    "postalCode": "",
                    "addressCountry": "US"
                },
                "geo": {
                    "latitude": "42.358",
                    "longitude": "-71.06"
                }
            }
        ]
    },
    "enrichments": {
        "normalizedJobLocations": [
            {
                "postalAddress": {
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Boston",
                        "addressRegion": "MA",
                        "addressCountry": "US"
                    },
                    "geo": {
                        "latitude": "42.35843",
                        "longitude": "-71.05977"
                    }
                },
                "locationId": "4930956",
                "countryCode": "US"
            }
        ]
    },
    "attributeValuePairs": [
        {
            "name": "location_0_addressRegionName",
            "value": "Massachusetts"
        },
        {
            "name": "location_0_addressCountryName",
            "value": "US"
        }
    ]
}




let ORGS_ORGIDS = {
    "jobPosting": {
        "hiringOrganization": {
            "name": "ROI Data Pro, LLC"
        },
        "identifier": {
            "name": "ROI Data Pro, LLC",
            "value": "633cd5cc-1936-4632-af1a-8b6786505751"
        },
    },
    "provider": {
        "code": "208f8022-ee55-4eb4-ada0-4c83364c8fb4",
        "name": "Top Echelon"
    },
    "enrichments": {
        "companyKb": { // all NOW customers?
            "normalizedCompanyName": "Virtusa",
            "code": "xcldincx", // optional
            "normalizedCompanyGuid": "k4wafni6cnf33hebxhwcdmodrf"
        }
    }
}



let TITLE = {
    "jobPosting": {
        "title": "Java Developer"
    },
    "enrichments": {
        "normalizedTitles": [
            {
                "title": "Java Software Engineer"
            }
        ]
    }
}



let EMPLOYMENT = {
    "enrichments": {
        "employmentTypes": [
            {
                "name": "UNKNOWN",
                "id": 29
            }
        ],
        "employmentTypeModifiers": [
            {
                "name": "UNKNOWN",
                "id": 129
            }
        ],
    },
    "fieldTranslations": [
        {
            "fieldName": "EmploymentType",
            "name": "FULL_TIME",
            "locale": "en-us",
            "translation": "full-time"
        }
    ]
}


let NOW = {
    "now": {
        "jobAdPricingTypeId": 1,
        "folderId": 274871298,
        "boardId": 1,
        "templateId": 1,
        "eeo": {
            "gender": true,
            "ethnicity": true
        }
    }
}
