<template>
    <div class='banner_page'>
        <div class="bar">
            <span class="label">培训通知：</span>
            <div class="value">
                <div class="answer" v-html="train1"></div>
            </div>
            <div class="btn_box">
                <router-link to="/richTextEdit/train1">去编辑</router-link>
            </div>
        </div>
        <div class="bar">
            <span class="label">服务内容：</span>
            <div class="value">
                <div class="answer" v-html="train2"></div>
            </div>
            <div class="btn_box">
                <router-link to="/richTextEdit/train2">去编辑</router-link>
            </div>
        </div>
        <div class="bar">
            <span class="label">优势与特色：</span>
            <div class="value">
                <div class="answer" v-html="train3"></div>
            </div>
            <div class="btn_box">
                <router-link to="/richTextEdit/train3">去编辑</router-link>
            </div>
        </div>
        <div class="bar">
            <span class="label">联系赞助：</span>
            <div class="value">
                <div class="answer" v-html="train4"></div>
            </div>
            <div class="btn_box">
                <router-link to="/richTextEdit/train4">去编辑</router-link>
            </div>
        </div>
        <div class="bar">
            <span class="label">接洽方式：</span>
            <div class="value">
                <div class="answer" v-html="train5"></div>
            </div>
            <div class="btn_box">
                <router-link to="/richTextEdit/train5">去编辑</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {getTrainAdv, getTrainContact, getTrainSponsor, getTrainNotice, getTrainService} from '@/apis/home';
    export default {
        data () {
            return {
                train1: '',
                train2: '', 
                train3: '',
                train4:'',
                train5:''
            };
        },
        mounted () {
            this.getData();
        },
        methods: {
            getData(){
                getTrainAdv().then(res =>{this.train3 =res.data?res.data.content : ''});
                getTrainContact().then(res =>{this.train5 = res.data?res.data.content : ''});
                getTrainSponsor().then(res =>{this.train4 = res.data?res.data.content : ''});
                getTrainNotice().then(res =>{this.train1 = res.data?res.data.content : ''});
                getTrainService().then(res =>{this.train2 = res.data?res.data.content : ''});
            }
            
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
