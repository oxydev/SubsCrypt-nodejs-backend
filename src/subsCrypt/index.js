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