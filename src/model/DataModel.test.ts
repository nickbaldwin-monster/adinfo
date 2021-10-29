import {
    getAllProperties, getNamesOfDataSettings, getNamesOfJobProperties,
} from './DataModel';


// sanity checks


test('getNamesOfSettings is an array of names for all fields that can be displayed in table', () => {
    let fields = getNamesOfDataSettings();
    expect(fields).toEqual(
        expect.arrayContaining(["position", "adRank", "remainder", "adProvider", "company", "title", "location", "nowId", "jobId", "template", "xCode", "applyType", "formattedDate", "mesco", "provider", "providerCode", "dateRecency", "ingestionMethod", "pricingType", "seoJobId", "refCode", "validThrough", "validThroughGoogle", "remote"]
        )
    );
});

