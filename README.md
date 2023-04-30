# Buy-Me-A-Coffee
## QuickStart
```
$ git clone https://github.com/abhi1506manu/Buy-Me-A-Coffee.git
```
```
### Install Dependency
```
$ cd Buy-Me-A-Coffee
$ npm install
```
## Add ``.env`` file
### Create an Alchemy account get your API KEY
```
Sepolia_RPC_URL = https://eth-sepolia.g.alchemy.com/v2/<API KEY>

```
### Open Metamask go to account details then export Private Key and paste in ``.env`` file
```
PRIVATE_KEY = <mktahstbxjsisbshyxsodybs>
``
## Usage
Compile
```
$ npx hardhat compile
```
Deploy
```
$ npx hardhat run scripts/deploy.js

AND

$ npx hardhat run scripts/buy-coffee.js
```
