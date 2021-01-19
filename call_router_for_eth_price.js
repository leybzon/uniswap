var Web3 = require('web3');
//import web3;

const infuraProjectId = "edb1d45f792244bfa97c13d84a809090";
const web3 = new Web3("https://kovan.infura.io/v3/" + infuraProjectId);
const aggregatorV3InterfaceABI = [{
        "inputs": [],
        "name": "decimals",
        "outputs": [{
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "description",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint80",
            "name": "_roundId",
            "type": "uint80"
        }],
        "name": "getRoundData",
        "outputs": [{
                "internalType": "uint80",
                "name": "roundId",
                "type": "uint80"
            }, {
                "internalType": "int256",
                "name": "answer",
                "type": "int256"
            },
            {
                "internalType": "uint256",
                "name": "startedAt",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "updatedAt",
                "type": "uint256"
            },
            {
                "internalType": "uint80",
                "name": "answeredInRound",
                "type": "uint80"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "latestRoundData",
        "outputs": [{
                "internalType": "uint80",
                "name": "roundId",
                "type": "uint80"
            },
            {
                "internalType": "int256",
                "name": "answer",
                "type": "int256"
            },
            {
                "internalType": "uint256",
                "name": "startedAt",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "updatedAt",
                "type": "uint256"
            },
            {
                "internalType": "uint80",
                "name": "answeredInRound",
                "type": "uint80"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "version",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }
];

const addr = "0x9326BFA02ADD2366b30bacB125260Af641031331";
const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);

priceFeed.methods.description().call()
    .then((description) => {
        console.log("Agregator:", description)
    });

priceFeed.methods.version().call()
    .then((version) => {
        console.log("Version:", version)
    });

priceFeed.methods.decimals().call()
    .then((decimals) => {
        console.log("Decimals:", decimals);
		
	priceFeed.methods.latestRoundData().call()
    .then((roundData) => {
		  console.log("Latest Round Data:", roundData);
		  var dateUpdated = new Date(roundData.updatedAt * 1000);
		  console.log("Updated on:", dateUpdated.toLocaleString ("en-US"));
		  console.log("Exchange rate:", roundData.answer/10**decimals);
	});	
 });

