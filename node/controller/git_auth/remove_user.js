const github_user_data_model = require("../../model/github_user_data");
require("dotenv").config();

module.exports = remove_user = (req, res) => {
    try {
        const dbId = req.body.dbId

        const userDataModel = new github_user_data_model({
            _id: dbId
        });

        userDataModel.deleteOne().then((result) => {
            if (!result.acknowledged) {
                return res.status(501).json({
                    status: false,
                    statusCode: 501,
                    error: err,
                    message: "unable to remove user",
                });
            }

            return res.status(200).json({
                status: true,
                statusCode: 200,
                message: "user removed successfully",
            });
        }).catch((error) => {
            return res.status(501).json({
                status: false,
                statusCode: 501,
                error: err,
                message: "unable to remove user",
            });
        })

    } catch (err) {
        return res.status(400).json({
            status: false,
            statusCode: 400,
            error: err,
            message: "unable to remove user",
        });
    }
}
