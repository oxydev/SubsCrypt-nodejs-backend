'use strict';

import subscrypt from 'subscrypt';

const errors = require('../errors');

const refactorRes = (response)=>{
    let status = response.status==='Fetched'?200:400;
    let result = response.result;
    return [status, result]
}
exports.checkAuth = async (req, res, next) => {
    // check user authorization
    let username = req['username']
    let provider_address = req['provider_address']
    let token = req['token']
    let pass_phrase = req['phrase']
    const response = await subscrypt.checkAuth(username, provider_address, token, pass_phrase)
    let arr = refactorRes(response)
    res.status(arr[0]).json(arr[1])
};

exports.retrieveWholeDataWithPassword = async (req, res, next) => {
    // Retrieve whole data with password
    // (user: string, token: String, phrase: String) -> Vec<SubscriptionRecord>
    let username = req['username']
    let token = req['token']
    let phrase = req['phrase']
    const response = await subscrypt.retrieveDataWithPassword(username, token, phrase)
    let arr = refactorRes(response)
    res.status(arr[0]).json(arr[1])
};

exports.retrieveWholeDataWithWallet = async(req, res, next) => {
    // Retrieve whole data with wallet
    let username = req['username']
    const response = await subscrypt.retrieveWholeDataWithWallet(username)
    let arr = refactorRes(response)
    res.status(arr[0]).json(arr[1])
};

exports.retrieveDataWithPassword = async (req, res, next) => {
    // Retrieve data with password
    // (user: string, provider_address: string, token: String, phrase: String) -> Vec<SubscriptionRecord>
    let user = req['user']
    let provider_address = req['provider_address']
    let token = req['token']
    let phrase = req['phrase']
    const response = await subscrypt.retrieveDataWithPassword(user, provider_address, token, phrase)
    let arr = refactorRes(response)
    res.status(arr[0]).json(arr[1])
};

exports.retrieveDataWithWallet = async (req, res, next) => {
    // Retrieve data with wallet
    let username = req['username']
    let provider_address = req['provider_address']
    const response = await subscrypt.retrieveDataWithWallet(username, provider_address)
    let arr = refactorRes(response)
    res.status(arr[0]).json(arr[1])
};

exports.checkSubscription = async (req, res, next) => {
    // check subscription
    // (user: string, provider_address: string, plan_index: u128) -> boolean
    let user = req['user']
    let provider_address = req['provider_address']
    let plan_index = req['plan_index']
    const response = await subscrypt.checkSubscription(user, provider_address, plan_index)
    let arr = refactorRes(response)
    res.status(arr[0]).json(arr[1])
};

exports.checkSubscriptionWithUsername = async (req, res, next) => {
    let username = req['username']
    let provider_address = req['provider_address']
    let phrase = req['phrase']
    const response = await subscrypt.checkSubscriptionWithUsername(username, provider_address, phrase)
    let arr = refactorRes(response)
    res.status(arr[0]).json(arr[1])
};
exports.getUsernameByAddress = async (req, res, next) => {
    let address = req['address']
    const response = await subscrypt.getUsernameByAddress(address)
    let arr = refactorRes(response)
    res.status(arr[0]).json(arr[1])
};
exports.retrieveDataWithUsername = async (req, res, next) => {
    let username = req['username']
    let provider_address = req['provider_address']
    let phrase = req['phrase']
    const response = await subscrypt.retrieveDataWithUsername(username, provider_address, phrase)
    let arr = refactorRes(response)
    res.status(arr[0]).json(arr[1])
};

exports.getPlanData = async (req, res, next) => {
    let provider_address = req['provider_address']
    let plan_index = req['plan_index']
    const response = await subscrypt.getPlanData(provider_address, plan_index)
    let arr = refactorRes(response)
    res.status(arr[0]).json(arr[1])
};
exports.retrieveWholeDataWithUsername = async (req, res, next) => {
    let username = req['username']
    let phrase = req['phrase']
    const response = await subscrypt.retrieveWholeDataWithUsername(username, phrase)
    let arr = refactorRes(response)
    res.status(arr[0]).json(arr[1])
};
exports.isUsernameAvailable = async (req, res, next) => {
    let username = req['username']
    const response = await subscrypt.isUsernameAvailable(username)
    let arr = refactorRes(response)
    res.status(arr[0]).json(arr[1])
};
exports.userCheckAuthWithUsername = async (req, res, next) => {
    let username = req['username']
    let pass_phrase = req['pass_phrase']
    const response = await subscrypt.userCheckAuthWithUsername(username, pass_phrase)
    let arr = refactorRes(response)
    res.status(arr[0]).json(arr[1])
};
exports.providerCheckAuthWithUsername = async (req, res, next) => {
    let username = req['username']
    let pass_phrase = req['pass_phrase']
    const response = await subscrypt.providerCheckAuthWithUsername(username, pass_phrase)
    let arr = refactorRes(response)
    res.status(arr[0]).json(arr[1])
};

exports.checkAuthWithUsername = async (req, res, next) => {
    let username = req['username']
    let provider_address = req['provider_address']
    let pass_phrase = req['pass_phrase']
    const response = await subscrypt.checkAuthWithUsername(username, provider_address, pass_phrase)
    let arr = refactorRes(response)
    res.status(arr[0]).json(arr[1])
};

