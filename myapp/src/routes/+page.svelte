<script lang="ts">
    const apiUrl = "http://localhost:5117/api/Xecute/v1/Perform";

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
    let apiData = []; // Holds the data from the API

   async function callApi() {
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
    }
</script>

<button class="button" on:click={callApi}>Call API</button>
<!-- Table to display the data -->
<table>
    <thead>
        <tr>
            <th>#</th>
            <th>Column 1</th>
            <th>Column 2</th>
            <!-- Add more column headers as needed -->
        </tr>
    </thead>
    <tbody>
        {#each apiData as row, index}
            <tr>
                <td>{index + 1}</td>
                <td>{row.BusinessName}</td>
                <td>{row.CreatedBy}</td>
                <!-- Add more table cells based on the response structure -->
            </tr>
        {/each}
    </tbody>
</table>

<style>
    
/**** button styles ****/
.button {
    padding: 5px 10px;
    font-size: 10px;
    cursor: pointer;
    background-color: #6c757d;
    color: #fff;
    border: none;
    border-radius: 2px;
    box-shadow: 0 2px 4px #0003;
    gap: 1px;
}

    .button:hover {
        opacity: .8;
        box-shadow: 0 4px 8px #0000004d
    }

    .button.btn-green {
        background-color: #4CAF50; /* Green */
        color: #fff;
    }

    .button.btn-red {
        background-color: #F44336; /* Red */
        color: #fff;
    }

    .button.btn-blue {
        background-color: #2196F3; /* Blue */
        color: #fff;
    }

    .button.btn-gray {
        background-color: #9E9E9E; /* Gray */
        color: #fff;
    }

    .button.btn-yellow {
        background-color: #FFEB3B; /* Yellow */
        color: #000;
    }

    .button.btn-magenta {
        background-color: #E91E63; /* Magenta */
        color: #fff;
    }

    .button.btn-offwhite {
        background-color: #F9F6EE; /* Off-white */
        color: #000;
    }

    /* Disabled state */
    .button:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
        opacity: 0.6;
    }
</style>
