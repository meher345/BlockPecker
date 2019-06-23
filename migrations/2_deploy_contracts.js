const Trademark = artifacts.require("Trademark");

module.exports = function(deployer) {
  deployer.deploy(Trademark);
};
