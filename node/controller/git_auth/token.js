const axios = require('axios');
const github_user_data_model = require("../../model/github_user_data");
require("dotenv").config();

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

module.exports = token_callback = (req, res) => {
    try {
        const requestToken = req.body.code

        if (!requestToken) {
            return res.status(401).json({
                status: false,
                statusCode: 401,
                message: "invalid request token",
            });
        }

        // authenticate github login using oauth2 and retrive access token from oauth2
        axios({
            method: 'post',
            url: `https://github.com/login/oauth/access_token?client_id=${githubClientId}&client_secret=${githubClientSecret}&code=${requestToken}`,
            headers: {
                accept: 'application/json'
            }
        }).then((response) => {

            const access_token = response.data.access_token;

            if (!access_token) {
                return res.status(401).json({
                    status: false,
                    statusCode: 401,
                    message: "invalid access token",
                });
            }

            // authenticate access token recieved after successfull authentication from oauth2 and retrive user data and store it in db
            axios({
                method: 'get',
                url: `https://api.github.com/user`,
                headers: {
                    Authorization: 'token ' + access_token
                }
            }).then((response) => {
                if (response.status !== 200) {
                    return res.status(401).json({
                        status: false,
                        statusCode: 401,
                        message: "oauth2 authentication failed",
                    });
                }

                const { login, id, node_id, avatar_url, gravatar_id, url, html_url, followers_url,
                    following_url, gists_url, starred_url, subscriptions_url, organizations_url,
                    repos_url, events_url, received_events_url, type, user_view_type, site_admin,
                    name, company, blog, location, email, hireable, bio, twitter_username, notification_email,
                    public_repos, public_gists, followers, following, created_at, updated_at
                } = response.data;

                const userDataModel = new github_user_data_model({
                    login: login,
                    id: id,
                    node_id: node_id,
                    avatar_url: avatar_url,
                    gravatar_id: gravatar_id,
                    url: url,
                    html_url: html_url,
                    followers_url: followers_url,
                    following_url: following_url,
                    gists_url: gists_url,
                    starred_url: starred_url,
                    subscriptions_url: subscriptions_url,
                    organizations_url: organizations_url,
                    repos_url: repos_url,
                    events_url: events_url,
                    received_events_url: received_events_url,
                    type: type,
                    user_view_type: user_view_type,
                    site_admin: site_admin,
                    name: name,
                    company: company,
                    blog: blog,
                    //--------
                    location: location,
                    email: email,
                    hireable: hireable,
                    bio: bio,
                    twitter_username: twitter_username,
                    notification_email: notification_email,
                    public_repos: public_repos,
                    public_gists: public_gists,
                    followers: followers,
                    following: following,
                    created_at_git: created_at,
                    updated_at_git: updated_at
                });

                userDataModel.save()
                    .then((result) => {
                        return res.status(200).json({
                            status: true,
                            statusCode: 200,
                            data: {
                                dbId: result._id,
                                login: result.login,
                                id: result.id,
                                url: result.url,
                                type: result.type,
                                updated_at: result.updated_at,
                                token: access_token
                            },
                            message: "user information stored successfully",
                        });
                    })
                    .catch((error) => {
                        return res.status(502).json({
                            status: false,
                            statusCode: 502,
                            error: error,
                            message: "unable to store user information",
                        });
                    });
            })

        }).catch((error) => {
            return res.status(401).json({
                status: false,
                statusCode: 401,
                error: error,
                message: "github authentication failed",
            });
        })

    } catch (err) {
        return res.status(400).json({
            status: false,
            statusCode: 400,
            error: err,
            message: "unable to authenticate user",
        });
    }
}
