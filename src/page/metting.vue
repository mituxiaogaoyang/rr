<template>
    <div class='banner_page'>
        <div class="bar">
            <div class="label2">会议通知</div>
            <notice-list></notice-list>
        </div>
        <div class="bar">
            <span class="label">联系赞助-<br/>接洽方式：</span>
            <div class="value">
                <div class="answer" v-html="meeting4"></div>
            </div>
            <div class="btn_box">
                <router-link to="/richTextEdit/meeting4">去编辑</router-link>
            </div>
        </div>
        <div class="bar">
            <span class="label">承接会议：</span>
            <div class="value">
                <div class="answer" v-html="meeting2"></div>
            </div>
            <div class="btn_box">
                <router-link to="/richTextEdit/meeting2">去编辑</router-link>
            </div>
        </div>
        <div class="bar">
            <span class="label">优势与特色：</span>
            <div class="value">
                <div class="answer" v-html="meeting3"></div>
            </div>
            <div class="btn_box">
                <router-link to="/richTextEdit/meeting3">去编辑</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {getMeetingAdv, getMeetingContact, getMeetingSponsor, getMeetingNotice, getMeetingUndertake} from '@/apis/home';
    import noticeList from './service/noticeList';
    export default {
        components:{noticeList},
        data () {
            return {
                meeting4: '',
                meeting2: '', 
                meeting3: '',
            };
        },
        mounted () {
            this.getData();
        },
        methods: {
            getData(){
                getMeetingAdv().then(res =>{this.meeting3 = res.data?res.data.content : ''});
                getMeetingContact().then(res =>{this.meeting4 = res.data?res.data.content : ''});
                getMeetingUndertake().then(res =>{this.meeting2 =res.data?res.data.content : ''});
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
        .label2{
            font-weight: bold;
            margin:20px 0;
        }
        .label{
            font-weight: bold;
            position: absolute;
            top:20px;
            left:0;
        }
        .btn_box{
            position: absolute;
            top:60px;
            left:0;
            a{
                color:#409EFF;
                text-decoration: none;
                border-bottom: 1px solid #409EFF;
                font-size: 12px;
            }
        }
    }
}
</style>
