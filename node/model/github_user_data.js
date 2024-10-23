const mongoose = require('mongoose')

const githuUbserData = new mongoose.Schema(
    {
        "login": {
            type: String,
            require: true
        },
        "id": {
            type: Number,
            require: true
        },
        "node_id": {
            type: String,
            require: true
        },
        "avatar_url": {
            type: String,
            default: ""
        },
        "gravatar_id": {
            type: String,
            default: ""
        },

        //---------

        "url": {
            type: String,
            default: ""
        },
        "html_url": {
            type: String,
            default: ""
        },
        "followers_url": {
            type: String,
            default: ""
        },
        "following_url": {
            type: String,
            default: ""
        },
        "gists_url": {
            type: String,
            default: ""
        },
        "starred_url": {
            type: String,
            default: ""
        },
        "subscriptions_url": {
            type: String,
            default: ""
        },
        "organizations_url": {
            type: String,
            default: ""
        },
        "repos_url": {
            type: String,
            default: ""
        },
        "events_url": {
            type: String,
            default: ""
        },
        "received_events_url": {
            type: String,
            default: ""
        },
        "type": {
            type: String,
            default: ""
        },
        "user_view_type": {
            type: String,
            default: ""
        },
        "site_admin": {
            type: Boolean,
            default: false
        },
        "name": {
            type: String,
            default: null
        },
        "company": {
            type: String,
            default: null
        },
        "blog": {
            type: String,
            default: ""
        },
        "location": {
            type: String,
            default: null
        },
        "email": {
            type: String,
            default: null
        },
        "hireable": {
            type: String,
            default: null
        },
        "bio": {
            type: String,
            default: null
        },
        "twitter_username": {
            type: String,
            default: null
        },
        "notification_email": {
            type: String,
            default: null
        },
        "public_repos": {
            type: Number,
            default: 0
        },
        "public_gists": {
            type: Number,
            default: 0
        },
        "followers": {
            type: Number,
            default: 0
        },
        "following": {
            type: Number,
            default: 0
        },
        "created_at_git": {
            type: String,
            default: ""
        },
        "updated_at_git": {
            type: String,
            default: ""
        },
    },
    {
        collection: "github_user_data",
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);


module.exports = mongoose.model("github_user_data", githuUbserData);

