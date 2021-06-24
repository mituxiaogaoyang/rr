<template>
    <div class='banner_page'>
        <div class="bar">
            <span class="label">软件简介：</span>
            <div class="value">
                <div class="answer" v-html="caltpp1"></div>
            </div>
            <div class="btn_box">
                <router-link to="/richTextEdit/caltpp1">去编辑</router-link>
            </div>
        </div>
        <div class="bar">
            <span class="label">核心功能：</span>
            <div class="value">
                <div class="answer" v-html="caltpp2"></div>
            </div>
            <div class="btn_box">
                <router-link to="/richTextEdit/caltpp2">去编辑</router-link>
            </div>
        </div>
        <div class="bar">
            <span class="label">优势与特色：</span>
            <div class="value">
                <div class="answer" v-html="caltpp3"></div>
            </div>
            <div class="btn_box">
                <router-link to="/richTextEdit/caltpp3">去编辑</router-link>
            </div>
        </div>
        <div class="bar">
            <span class="label">采购流程：</span>
            <div class="value">
                <div class="answer" v-html="caltpp4"></div>
            </div>
            <div class="btn_box">
                <router-link to="/richTextEdit/caltpp4">去编辑</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {getAdv, getCore, getBuy, getSoft, setAdv, setCore, setBuy, setSoft} from '@/apis/home';
    export default {
        data () {
            return {
               caltpp1: '',
               caltpp2: '', 
               caltpp3: '',
               caltpp4:'',

            };
        },
        mounted () {
            this.getData();
        },
        methods: {
            getData(){
                getAdv().then(res =>{this.caltpp3 = res.data.content;});
                getCore().then(res =>{this.caltpp2 = res.data.content;});
                getBuy().then(res =>{this.caltpp4 = res.data.content;});
                getSoft().then(res =>{this.caltpp1 = res.data.content;});
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
                max-height: 150px;
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
