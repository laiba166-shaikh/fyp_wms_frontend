const Oware = artifacts.require("Oware");

module.exports = function (deployer) {
  deployer.deploy(Oware,"Transactions","TRX");
};