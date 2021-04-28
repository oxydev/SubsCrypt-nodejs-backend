'use strict';

import subscrypt from 'subscrypt';

const errors = require('../errors');


exports.checkAuth = async (req, res, next) => {
    // check user authorization
    let user = req['user']
    let provider_address = req['provider_address']
    let token = req['token']
    let pass_phrase = req['phrase']
    const response = await subscrypt.checkAuth(user, provider_address, token, pass_phrase)

};

exports.retrieveWholeDataWithPassword = async (req, res, next) => {
    // Retrieve whole data with password
    // (user: string, token: String, phrase: String) -> Vec<SubscriptionRecord>
    let user = req['user']
    let token = req['token']
    let phrase = req['phrase']
    const response = await subscrypt.retrieveDataWithPassword(user, token, phrase)

};

exports.retrieveWholeDataWithWallet = (req, res, next) => {
    // Retrieve whole data with wallet
};

exports.retrieveDataWithPassword = async (req, res, next) => {
    // Retrieve data with password
    // (user: string, provider_address: string, token: String, phrase: String) -> Vec<SubscriptionRecord>
    let user = req['user']
    let provider_address = req['provider_address']
    let token = req['token']
    let phrase = req['phrase']
    const response = await subscrypt.retrieveDataWithPassword(user, provider_address, token, phrase)

};

exports.retrieveDataWithWallet = async (req, res, next) => {
    // Retrieve data with wallet
};

exports.checkSubscription = async (req, res, next) => {
    // check subscription
    // (user: string, provider_address: string, plan_index: u128) -> boolean
    let user = req['user']
    let provider_address = req['provider_address']
    let plan_index = req['plan_index']
    const response = await subscrypt.checkSubscription(user, provider_address, plan_index)
};

exports.checkSubscriptionWithUsername = async (req, res, next) => {
    let username = req['username']
    let provider_address = req['provider_address']
    let phrase = req['phrase']
    const response = await subscrypt.checkSubscriptionWithUsername(username, provider_address, phrase)

};
exports.getUsernameByAddress = async (req, res, next) => {
    let address = req['address']
    const response = await subscrypt.getUsernameByAddress(address)

};
exports.retrieveDataWithUsername = async (req, res, next) => {
    let username = req['username']
    let provider_address = req['provider_address']
    let phrase = req['phrase']
    const response = await subscrypt.retrieveDataWithUsername(username, provider_address, phrase)

};

exports.getPlanData = async (req, res, next) => {
    let provider_address = req['provider_address']
    let plan_index = req['plan_index']
    const response = await subscrypt.getPlanData(provider_address, plan_index)

};
exports.retrieveWholeDataWithUsername = async (req, res, next) => {
    let username = req['username']
    let phrase = req['phrase']
    const response = await subscrypt.retrieveWholeDataWithUsername(username, phrase)

};exports.isUsernameAvailable = async (req, res, next) => {
    let username = req['username']
    const response = await subscrypt.isUsernameAvailable(username)

};
exports.userCheckAuthWithUsername = async (req, res, next) => {
    let username = req['username']
    let pass_phrase = req['pass_phrase']
    const response = await subscrypt.userCheckAuthWithUsername(username, pass_phrase)

};
exports.providerCheckAuthWithUsername = async (req, res, next) => {
    let username = req['username']
    let pass_phrase = req['pass_phrase']
    const response = await subscrypt.providerCheckAuthWithUsername(username, pass_phrase)
};

exports.checkAuthWithUsername = async (req, res, next) => {
    let username = req['username']
    let provider_address = req['provider_address']
    let pass_phrase = req['pass_phrase']
    const response = await subscrypt.checkAuthWithUsername(username, provider_address, pass_phrase)

};

