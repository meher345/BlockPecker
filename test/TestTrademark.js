const Trademark = artifacts.require("./Trademark.sol");

var accounts;
var owner;

contract('Trademark', async (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('can Create a mark', async() => {
    let tokenId = 1;
    let instance = await Trademark.deployed();
    await instance.createMark('Awesome mark!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToMarkInfo.call(tokenId), 'Awesome mark!')
});

it('lets user1 put up their mark for sale', async() => {
    let instance = await Trademark.deployed();
    let user1 = accounts[1];
    let markId = 2;
    let markPrice = web3.utils.toWei(".01", "ether");
    await instance.createMark('awesome mark', markId, {from: user1});
    await instance.putMarkUpForSale(markId, markPrice, {from: user1});
    assert.equal(await instance.marksForSale.call(markId), markPrice);
});

it('lets user1 get the funds after the sale', async() => {
    let instance = await Trademark.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let markId = 3;
    let markPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createMark('awesome mark', markId, {from: user1});
    await instance.putMarkUpForSale(markId, markPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyMark(markId, {from: user2, value: balance});
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(markPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);
    assert.equal(value1, value2);
});

it('lets user2 buy a mark, if it is put up for sale', async() => {
    let instance = await Trademark.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let markId = 4;
    let markPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createMark('awesome mark', markId, {from: user1});
    await instance.putMarkUpForSale(markId, markPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyMark(markId, {from: user2, value: balance});
    assert.equal(await instance.ownerOf.call(markId), user2);
});

it('lets user2 buy a mark and decreases its balance in ether', async() => {
    let instance = await Trademark.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let markId = 5;
    let markPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createMark('awesome mark', markId, {from: user1});
    await instance.putMarkUpForSale(markId, markPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyMark(markId, {from: user2, value: balance, gasPrice:0});
    const balanceAfterUser2Buysmark = await web3.eth.getBalance(user2);
    let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2Buysmark);
    assert.equal(value, markPrice);
});

// Implement Task 2 Add supporting unit tests

it('can add the mark name and mark symbol properly', async() => {
    let instance = await Trademark.deployed();
    //1. Create a mark
    let tokenName = "Trademark Token Registry";
    let tokenSymbol = "TMT";
    //2. Call the name and symbol properties in your Smart Contract and compare with the name and symbol provided
    assert.equal(await instance.name.call(), tokenName);
    assert.equal(await instance.symbol.call(), tokenSymbol);
});

it('lets 2 users exchange marks', async() => {
    let instance = await Trademark.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    // 1. Create 2 marks
    let markId1 = 7;
    let markId2 = 8;
    await instance.createMark("My First Trademark", markId1, { from: user1 });
    await instance.createMark("My Trademark with Solid", markId2, {
    from: user2
  });
    // 2. Call the exchangemarks functions implemented in the Smart Contract
    await instance.approve(user2, markId1, { from: user1 });
    await instance.exchangeMarks(markId1, markId2, { from: user2 });
    // 3. Verify that the owners changed
    assert.equal(await instance.ownerOf(markId1), user2);
    assert.equal(await instance.ownerOf(markId2), user1);
});

it('lets a user transfer a mark', async() => {
    let instance = await Trademark.deployed();
    // 1. create a mark
    let user1 = accounts[0];
    let user2 = accounts[2];
    let markId = 6;
    await instance.createMark("my awesome star", markId, { from: user1 });
    // 2. use the transfermark function implemented in the Smart Contract
    await instance.transferAMark(user2, markId);
    // 3. Verify the mark owner changed.
    assert.equal(await instance.ownerOf(markId), user2);

});

