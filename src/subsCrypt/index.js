'use strict';

import subscrypt from 'subscrypt';

const errors = require('../errors');


exports.checkAuth = (req, res, next) => {
    // check user authorization

};

exports.retrieveWholeDataWithPassword = (req, res, next) => {
    // Retrieve whole data with password
    // (user: string, token: String, phrase: String) -> Vec<SubscriptionRecord>

};

exports.retrieveWholeDataWithWallet = (req, res, next) => {
    // Retrieve whole data with wallet


};

exports.retrieveDataWithPassword = (req, res, next) => {
    // Retrieve data with password
    // (user: string, provider_address: string, token: String, phrase: String) -> Vec<SubscriptionRecord>

};

exports.retrieveDataWithWallet = (req, res, next) => {
    // Retrieve data with wallet


};

exports.checkSubscription = (req, res, next) => {
    // check subscription
    // (user: string, provider_address: string, plan_index: u128) -> boolean


};