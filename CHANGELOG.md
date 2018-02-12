# Change Log
All notable changes to this project will be documented in this file.

## v4.1.0 - 2018-02-12
### Added
- Market Data functionality (EOD prices, FX rates and curves)

## v4.0.1 - 2018-02-09
### Changed
- Refactored configuration. @joshringer

## v4.0.0 - 2018-02-05
### Changed
- Changed PositionPNL and TransactionPNL classes to have `errorMessage` and `additional` instead of just `message`
- Added `fxRates` to the AggregatePNL class

## v3.3.0 - 2018-01-26
### Added
- Added time properties to the UploadResult

### Changed
- Allow file name to be passed to upload path

## v3.2.0 - 2018-01-25
### Added
- Added AggregatePNL class

### Changed
- Retrieve aggregate pnl returns class

## v3.1.0 - 2018-01-12
### Added
- Added various EOD price APIs

## v3.0.2 - 2018-01-11
### Changed
- Changed the interface for pubsub credentials.

## v3.0.1 - 2018-01-10
### Changed
- Fixed passing of `more` param in `listImportJobs`.

## v3.0.0 - 2018-01-09
### Changed
- Updated csv upload functions.

### Added
- Added listImportJobs function for csv upload.

## v2.4.0 - 2018-01-05
### Changed
- Updated dependencies.

## v2.3.0 - 2018-01-03
### Added
- Added Transaction MTM features.

## v2.2.1 - 2017-12-15
### Changed
- Fixed wrong path for endpoint.

## v2.2.0 - 2017-12-14
### Added
- Added API functions for CSV upload.

## v2.1.9 - 2017-12-11
### Changed
- Amended type declaration for PNL APIs.

## v2.1.7 - 2017-12-08
### Changed
- Changed PnL & quantity attributes in PnL classes to Decimal.

## v2.1.6 - 2017-12-06
### Added
- Add checking to the argument of Decimal instantiation.

## v2.1.5 - 2017-12-06
### Added
- Added `currency` to TransactionPNL.

## v2.1.4 - 2017-12-06
### Changed
- Changed the type declaration for `TransactionPNL`. Fix typo in `TransactionPNL.retrieve()` function parameters.

## v2.1.3 - 2017-12-05
### Added
- Added `averagePrice` to Position class.

## v2.1.2 - 2017-12-05
### Changed
- Replaced `businessDate` with `assetId` in TransactionPNL query object.

## v2.1.1 - 2017-12-05
### Added
- Added `Trust Fund` to list of Asset Manager Types.

## v2.1.0 - 2017-11-29
### Added
- Added Profit & Loss classes and functions.

## v2.0.4 - 2017-11-27
### Added
- Added `Settlement` to list of Cash Transaction types.

## v2.0.2 - 2017-11-16
### Changed
- Changed config key for production from "prod" to "production".

## v2.0.1 - 2017-11-10
### Added
- Added a `staging-pro` config option.

## v2.0.0 - 2017-11-08
### Changed
- Fixed erroneous type definitions.

## v1.1.1 - 2017-11-07
### Changed
- Removed the `fuzzy` parameter from fuzzySearch function.

## v1.1.0 - 2017-11-02
### Added
- Added a CashTransaction class.

## v1.0.1 - 2017-10-31
### Changed
- Changed the endpoint for the pub/sub credentials.

## v1.0.0 - 2017-10-30
### Added
- Added bookPermissions endpoints to allow retrieval and update of Book Permissions.
- Added a PhoneNumber class to Parties (changed from `contactNumber` attribute).
- Added Activity class for Monitor.
- Added Activity API function (only retrieve).
- Added a `reference` attribute to Books.
- Added a `referencePrimary` attribute to the Reference model.
- Added an Asset upsert function.
- Added a getAssetConfig function.
- Added a ForeignExchangeSpot class.
- Added a Currency field to ForeignExchange classes.
- Added 'Short Cover' to Transaction: transactionAction.
- Added 'Demo' to Account Types.
- Added a register API function (for the signup workflow).
- Added approveRel, revokeRel and rejectRel API functions.
- Added fieldsSearch to Parties.
- Added 'DataProvider' to Relationship types.

### Changed
- Ensure the fuzzySearch functions do not force `fuzzy: true`.
- Use AMId in the endpoint address (execpt for insert AssetManager).
- Fix gross and net settlement get/setters to use existing grossSettlement/netSettlement if available.
- Change defaultBookOwnerId from number to string type.
- Change ForeignExchange classes to subclass: ForeignExchangeBase <- ForeignExchange <- ForeignExchangeSpot <- ForeignExchangeForward.
- Moved licenseType, licenseNumber, assetsUnderManagement, registrationNumber from Company model to AssetManager subclass model.

## v0.1.3 - 2017-09-08
### Added
- Added CommodityFuture and ForeignExchangeFuture classes.
- Added getCredentialsForPubSub function to api.AssetManagers.
- Added retrieveItem function for api.Monitor.
- Added getRelatedAMID function for api.Relationships.
- Added fieldSearch functions to api.Assets, api.Positions and api.Transactions.
- Added ForeignExchangeForward class.
- Added the searchDomains function for generic search on Domains.
- Add a `sendInviation()` function to Relationships.
- Add fields to Individual class *(department, role, contactNumber, title)*.
- Add fields to Company class *(licenseNumber, licenseType, registrationNumber, assetsUnderManagement, contactNumber, yearOfIncorporation)*.
- Add fuzzySearch function to Assets.
- Add fuzzySearch function to Parties.

### Changed
- Changed the handling of the retrieve and search functions in api.Monitor to accept an object with shape `{ data: [], totalPages: 1 }`.
- Deleted the NonDeliverableForward class (replaced by ForeignExchangeForward).
- Amend the `api.config` to reflect the changes in the endpoint naming.
- Amended the searchData function to accept either arrays or non-array types. Non-array types will be cast to strings. Allowing non-array types for convenience and because more single value query params are appearing.
- Updated the checkDomains function to reflect changes in the API (`domain` is changed to `domains`).
- Updated the insertDomains function to reflect changes in the API (include `AMId` in the params and eveything else should be in the request body).

## v0.1.2 - 2017-07-31
### Added
- Added accountType field to the AssetManager class.
- Added a csv parser to convert csv strings into Assets, Books, Parties, Transactions. @JYL123
- Added PrivateInvestment class (with ownership property).
- Added ownership property to RealAsset and its subclasses.
- Added `apiVersion` option to the api config. This will default to the latest stable version.
- Added type declaration file for AssetManager class and api.AssetManagers.*
- Add monitor item class.
- Add monitor api calls (insertNewItem, resubmitItem, searchItems, closeItem).
- Add domains sub-service to AssetManagers.
- Add EODBook class and retrieveEODBooks function to AssetManagers module.
- Add fundamentals service.

### Changed
- Removed `maturityDate` from the Asset base class and set either maturityDate or expiryDate on the relevant subclasses.
- Removed `premium` from Asset classes.
- Changed `Retail` type for AssetManager class to `Individual`.
- Do not set the AMaaS Reference (ASset, Corporate Action, Transaction). This should be done server side where the default referenceValue can be generated.
- Allow api version to be set on the production api option.
- Subclass Link for the various classes that have them. This is because the properties vary depending on the parent class. E.g. Transaction Link has linkedTransactionId, Party Link has linkedPartyId.
- Update and improve tests.

## 0.0.2 - 2017-05-09
### Changed
- Renamed the two files in `src/transactions/Transaction/*` to start with lowercase letters. Import statement in the index file was looking for files starting with capitals which was causing NotFound in some systems.

## 0.0.1 - 2017-05-08
### Added
- Published amaas-core-sdk-js to npm.
