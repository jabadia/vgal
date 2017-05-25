<template>
    <q-layout>
        <div slot="header" class="toolbar">
            <q-toolbar-title :padding="0">
                Videos
                <!--<img src="../assets/union_jack_small.png" alt="">-->
            </q-toolbar-title>
        </div>

        <!--
          Replace following "div" with
          "<router-view class="layout-view">" component
          if using subRoutes
        -->
        <div class="layout-view ja-main-view">
            <div class="layout-padding">
                <div v-for="email in emails">
                    <h5>{{email.createdDateTime|formatDate}}, {{email.subject}}</h5>
                    <div class="ja-gallery row wrap justify-start items-stretch small-gutter">
                        <div v-if="!email.videosDetails.length" class="sm-width-1of2 md-width-1of5 gt-md-width-1of6">
                            <div class="card ja-card">
                                <div class="card-title">Ups!</div>
                                <div class="card-content">
                                    <span>no hay videos en este email</span>
                                </div>
                            </div>
                        </div>
                        <div v-for="video in email.videosDetails" class="sm-width-1of2 md-width-1of5 gt-md-width-1of6">
                            <div class="card ja-card" @click="openVideo(video)">
                                <!--<a :href="video.link">-->
                                <div class="card-media">
                                    <img :src="video.thumbnails.medium.url" alt="">
                                </div>
                                <div class="card-content">
                                    {{video.title}}
                                </div>
                                <!--</a>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <q-modal ref="videoModal" position="bottom" :content-css="{minWidth: '80vw', minHeight: '80vh'}"
                 @close="closedVideoModal">
            <q-layout>
                <div slot="header" class="toolbar">
                    <q-toolbar-title :padding="1">
                        <i>ondemand_video</i> Play Video
                    </q-toolbar-title>
                    <button @click="$refs.videoModal.close()">
                        <i>close</i>
                    </button>
                </div>
                <div class="layout-view">
                    <div v-if="currentVideo.id" class="layout-padding">
                        <div class="video">
                            <iframe
                                width="853"
                                height="480"
                                :src="'https://www.youtube.com/embed/' + currentVideo.id + '?autoplay=1&rel=0'"
                                frameborder="0"
                                allowfullscreen
                            ></iframe>
                        </div>
                        <span>{{currentVideo.title}}</span>
                    </div>
                </div>

            </q-layout>
        </q-modal>

    </q-layout>
</template>

<script>

    //    import {Utils, Platform} from 'quasar';
    import backendApi from '../services/backendApi.js';
    import moment from 'moment';
    import Vue from 'vue';
    import _ from 'lodash';

    Vue.filter('formatDate', function (value) {
        if (value) {
            return moment(value).format('DD/MM/YYYY');
        }
    });

    export default {
        data () {
            return {
                emails: [],
                currentVideo: {},
            };
        },
        computed: {},
        methods: {
            openVideo (video) {
                this.currentVideo = video;
                this.$nextTick(() => {
                    this.$refs.videoModal.open();
                });
                console.log(video);
            },
            closedVideoModal () {
                console.log('closed');
                this.currentVideo = {};
            },
        },
        mounted () {
            backendApi.getEmailsWithVideos().then(emails => {
                this.emails = _.orderBy(emails, 'createdDateTime', ['desc']);
            });
        },
        beforeDestroy () {
        },
    };
</script>

<style lang="less" rel="stylesheet/less">
    .ja-main-view {
        /*font-size: 12px;*/
        font-size: 80%;
    }

    html {
        /*font-size: 12px;*/
    }

    @media only screen and (min-width: 921px) {
        .gt-md-width-1of6 {
            -webkit-box-flex: 0;
            -ms-flex: 0 1 100%/6;
            flex: 0 1 100%/6;
        }
    }

    .ja-card {
        height: 100%;
    }
</style>
