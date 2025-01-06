<script>
const apiUrl = "http://localhost:5117/api/Xecute/v1/Perform";
    /**
     * @type {any[]}
     */
let apiData = []; // Holds the data from the API
const newDataCollection = [
    {
        "RESOURCE": "Setup.business",
        "PARAMS": [
            {
                "PARAM": "Action",
                "VALUE": "GETALL"
            }
        ]
    }
];
let PageListVisible = false;
let PageEntryVisible = true;
//function: 5
    /**
     * @param {string} action
     * @param {string} dataid
     */
    function PageGoNext(action, dataid) {
        switch (action) {
            case "div-page-list-business":
                PageListVisible = true;
                PageEntryVisible = false;
                PageGoActionEvent('div-page-list-business','0')
                break;

            case "div-page-entry-business":
                PageListVisible = false;
                PageEntryVisible = true;
                break;

            default:
                console.log("Invalid action");
                break;
        }
    }
    
//function: 6
    /**
     * @param {any} action
     * @param {any} dataid
     */
async function PageGoActionEvent(action, dataid) {
    switch (action) {
        case 'div-page-list-business':
            //WorkInProgress.Show('Getting ready...');
            //var newDataCollection = BindApiBodyInput('Setup.business', 'GETALL', {})
            // API.post(
            //     `${API_BASE_URL}/Perform`,
            //     newDataCollection,
            //     (response) => {
            //         var parsedData = JSON.parse(response);
            //         if (parsedData.SUCCESS && parsedData.TABLES > 0) {
            //             GenerateTableHTML('table-business', parsedData.EQResult);//tableName, dataList
            //         } else {
            //             Popup.Show("error", parsedData.MESSAGE);
            //         }
            //     },
            //     (xhr, status, error) => {
            //         Popup.Show("error", `Status: ${xhr.status} - ${xhr.errorMessage}`);
            //     },
            //     () => {
            //         WorkInProgress.Hide();
            //     }
            // );
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'app-token':'a10'
                    },
                    body: JSON.stringify(newDataCollection),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json(); // Parse the JSON response
                console.log('API Response:', data.EQResult[0].DynamicData);
                apiData =  data.EQResult[0].DynamicData;

            } catch (error) {
                console.error('Error calling API:', error);
            }
            break;
        default:
            console.log('Invalid action');
            break;
    }
}

</script>

<div class="row">
    <div class="card w-100">
        <div class="card-header">
            <h5 class="card-title">Business</h5>
            <div class="card-tools">
                <button id="btn-back-to-entry" type="button" class="button {PageListVisible ? '' : 'd-none'}" on:click={() => PageGoNext("div-page-entry-business", "0")} title="Back to Entry" ><i class="fas fa-angle-left"></i> Back to Entry</button>
                <button type="button" class="button" title="More options">...</button>
                <div class="dropdown">
                    <button type="button" class="button w-100 mt-1"><i class="fas fa-question-circle"></i> About Page</button>
                </div>
            </div>
        </div>
        <div class="card-body">
            <div id="div-page-entry-business" class="box-bordered mt-7 {PageEntryVisible ? '' : 'd-none'}">
                <input type="hidden" id="Id" value="0" />
                <div class="row">
                    <div class="col-md-2 col-12">
                        <div class="form-group">
                            <label for="BusinessLogo">Business Logo:</label>
                            <input
                                type="text"
                                id="BusinessLogo"
                                placeholder="Business Logo"
                                title="Business Logo"
                            />
                        </div>
                    </div>
                    <div class="col-md-4 col-12">
                        <div class="form-group">
                            <label for="BusinessName">Business Name:</label>
                            <input
                                type="text"
                                id="BusinessName"
                                placeholder="Enter Business Name"
                                title="Enter Business Name"
                            />
                        </div>
                    </div>
                    <div class="col-md-2 col-12">
                        <div class="form-group">
                            <label for="ShortName">Short Name:</label>
                            <input
                                type="text"
                                id="ShortName"
                                placeholder="Enter Short Name"
                                title="Enter Short Name"
                            />
                        </div>
                    </div>
                    <div class="col-md-4 col-12">
                        <div class="form-group">
                            <label for="OfficeAddress">Office Address:</label>
                            <input
                                type="text"
                                id="OfficeAddress"
                                placeholder="Enter Office Address"
                                title="Enter Office Address"
                            />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2 col-12">
                        <div class="form-group">
                            <label for="ContactName">Contact Name:</label>
                            <input
                                type="text"
                                id="ContactName"
                                placeholder="Enter Contact Name"
                                title="Enter Contact Name"
                            />
                        </div>
                    </div>
                    <div class="col-md-2 col-12">
                        <div class="form-group">
                            <label for="ContactNo">Contact No:</label>
                            <input
                                type="text"
                                id="ContactNo"
                                placeholder="Enter Contact No"
                                title="Enter Contact No"
                            />
                        </div>
                    </div>
                    <div class="col-md-2 col-12">
                        <div class="form-group">
                            <label for="EmailAddress">Email Address:</label>
                            <input
                                type="text"
                                id="EmailAddress"
                                placeholder="Enter Email Address"
                                title="Enter Email Address"
                            />
                        </div>
                    </div>
                    <div class="col-md-2 col-12">
                        <div class="form-group">
                            <label for="BIN">BIN:</label>
                            <input
                                type="text"
                                id="BIN"
                                placeholder="Enter BIN"
                                title="Enter BIN"
                            />
                        </div>
                    </div>
                    <div class="col-md-2 col-12">
                        <div class="form-group">
                            <label for="TaxVATNo">TAX/VAT No:</label>
                            <input
                                type="text"
                                id="TaxVATNo"
                                placeholder="Enter TAX/VAT No"
                                title="Enter TAX/VAT No"
                            />
                        </div>
                    </div>
                    <div class="col-md-2 col-12">
                        <div class="form-group">
                            <div class="custom-select">
                                <label for="CountryId">Country:</label>
                                <select id="CountryId" title="Select Country">
                                    <option value="-">Select</option>
                                    <option value="BD">BD</option>
                                    <option value="USA">USA</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-2 col-12">
                        <div class="form-group">
                            <div class="custom-select">
                                <label for="CurrencyId">Currency:</label>
                                <select id="CurrencyId" title="Select Currency">
                                    <option value="-">Select</option>
                                    <option value="BDT">BDT</option>
                                    <option value="USD">USD</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2 col-12">
                        <div class="form-group">
                            <label for="MaxEmployee">Max Employee:</label>
                            <input
                                type="number"
                                id="MaxEmployee"
                                placeholder="Enter Max Employee"
                                title="Enter Max Employee"
                            />
                        </div>
                    </div>
                    <div class="col-md-2 col-12">
                        <div class="form-group">
                            <label for="MaxSalary">Max Salary:</label>
                            <input
                                type="number"
                                id="MaxSalary"
                                placeholder="Enter Max Salary"
                                title="Enter Max Salary"
                            />
                        </div>
                    </div>
                    <div class="col-md-1 col-12">
                        <div class="form-group">
                            <label>Active?</label>
                            <div class="mt-6">
                                <label>
                                    <input type="checkbox" id="IsActive" />
                                    Yes
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box-footer">
                    <!-- <button type="button" class="button" on:click={() => PageGoValidateInput('testBind')}><i class="fa-solid fa-arrows-rotate"></i> test Bind</button>
                    <button type="button" class="button" on:click={() => PageGoClear('div-page-entry-business')}><i class="fa-solid fa-arrows-rotate"></i> Clear</button> -->
                    <button
                        type="button"
                        class="button"
                        on:click={() =>
                            PageGoNext("div-page-list-business", "0")}
                        ><i class="fas fa-search"></i> Search</button
                    >
                    <!-- <button type="button" class="button" on:click={() => PageGoActionEvent('div-page-entry-business','0')}><i class="fas fa-save"></i> Submit</button> -->
                </div>
            </div>
            <div id="div-page-list-business" class="box-bordered mt-7 {PageListVisible ? '' : 'd-none'}">
                <div class="box-body">
                    <table id="table-business" class="sortable">
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Business Name</th>
                                <th>Short Name</th>
                                <th>Address</th>
                                <th>Contact Name</th>
                                <th>Contact Number</th>
                                <th>Email</th>
                                <th>BIN</th>
                                <th>Tax/VAT No</th>
                                <th>Country</th>
                                <th>Currency</th>
                                <th>Max. Employee</th>
                                <th>Max. Salary</th>
                                <th>Status</th>
                                <th>#</th>
                            </tr>
                        </thead>

                        <tbody>
                            {#each apiData as row, index}
                            <tr>
                                <td>{row.BusinessLogo}</td>
                                <td>{row.BusinessName}</td>
                                <td>{row.ShortName}</td>
                                <td>{row.OfficeAddress}</td>
                                <td>{row.ContactName}</td>
                                <td>{row.ContactNo}</td>
                                <td>{row.EmailAddress}</td>
                                <td>{row.BIN}</td>
                                <td>{row.TaxVATNo}</td>
                                <td>{row.CountryId}</td>
                                <td>{row.CurrencyId}</td>
                                <td>{row.MaxEmployee}</td>
                                <td>{row.MaxSalary}</td>
                                <td>{row.BIN}</td>
                            </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
