<template>
    <div class='banner_page'>
        <div class="bar">
            <span class="label">公司概况：</span>
            <div class="value">
                <div class="answer" v-html="situation"></div>
            </div>
            <div class="btn_box">
                <router-link to="/richTextEdit/situation">去编辑</router-link>
            </div>
        </div>
        <div class="bar">
            <span class="label">公司文化：</span>
            <div class="value">
                <div class="answer" v-html="culture"></div>
            </div>
            <div class="btn_box">
                <router-link to="/richTextEdit/culture">去编辑</router-link>
            </div>
        </div>
        <div class="bar">
            <span class="label">大事记：</span>
            <div class="value">
                <div class="answer" v-html="events"></div>
            </div>
            <div class="btn_box">
                <router-link to="/richTextEdit/event">去编辑</router-link>
            </div>
        </div>
        <div class="bar">
            <span class="label">知识产权：</span>
            <div class="value">
                <div class="answer" v-html="ip"></div>
            </div>
            <div class="btn_box">
                <router-link to="/richTextEdit/ip">去编辑</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {getEvents, getCulture, getSituation, getIp} from '@/apis/home';
    export default {
        data () {
            return {
               situation: '',
               culture: '', 
               events: '',
               ip:'',

            };
        },
        mounted () {
            this.getData();
        },
        methods: {
            getData(){
                getEvents().then(res =>{this.events = res.data.content;});
                getCulture().then(res =>{this.culture = res.data.content;});
                getSituation().then(res =>{this.situation = res.data.content;});
                getIp().then(res =>{this.ip = res.data.content;});
            },

            
        },
    };
</script>

<style lang='less' scoped>
.banner_page{
    .bar{
        margin-bottom:16px;
        padding:16px 0;
        position: relative;
        border-bottom:1px dashed #ccc;
        .value{
            margin-left:100px;
            .answer{
                border:1px solid #ccc;
                padding: 5px 15px;
                border-radius: 4px;
                min-height: 70px;
                max-height: 150px;
                overflow: hidden;
            }
            .temp>div:last-child{
                margin-top:10px;
            }
        }
        .label{
            font-weight: bold;
            position: absolute;
            top:20px;
            left:0;
        }
        .btn_box{
            position: absolute;
            top:50px;
            left:0;
            a{
                color:#409EFF;
                text-decoration: none;
                border-bottom: 1px solid #409EFF;
                font-size: 12px;
            }
        }
        .upload-demo{
            margin:12px 100px;
        }
    }
}
</style>
