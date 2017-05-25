import axios from 'axios';
import _ from 'lodash';

export default {
    getEmailsWithVideos () {
        return axios.get('/statics/attachmentsWithLinks.json').then(attachments => {
            console.log(attachments.data);
            _.each(attachments.data, attachment => {
                attachment.createdDateTime = new Date(attachment.createdDateTime);
                // let linksById = _.keyBy(attachment.videos, 'v');
                // _.each(attachment.videosDetails, videoDetails => {
                //     // videoDetails.link = linksById[videoDetails.id].link.replace('/watch?v=', '/embed/');
                // });
            });
            return attachments.data;
        });
    },
};
