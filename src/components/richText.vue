<template>
    <div class='newsAdd'>
        <!--  -->
        <div class="title">
            <!-- 走进锐睿  >  -->
            {{pageTitle}}
        </div>
        
        <div class="line">
            内容：
            <div style="border: 1px solid #ccc; margin-top: 10px;">
                <!-- 工具栏 -->
                <Toolbar
                    style="border-bottom: 1px solid #ccc"
                    :editor="editor"
                    :defaultConfig="toolbarConfig"
                />
                <!-- 编辑器 -->
                <Editor
                    style="height: 360px; overflow-y: hidden;"
                    :defaultConfig="editorConfig"
                    v-model="html"
                    @onChange="onChange"
                    @onCreated="onCreated"
                />
            </div>
        </div>
        <div class="btn_box">
            <el-button plain @click="cancelAdd">取消</el-button>
            <el-button type="primary" plain @click="submitNews">确认</el-button>
            <!-- <el-button type="info" plain @click="previewNews">预览</el-button> -->
        </div>
    </div>
</template>

<script>
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    import {apiContextPath, getEvents, getCulture, getSituation, getIp,setEvents, setCulture, setSituation, setIp,
            getAdv, getCore, getBuy, getSoft, setAdv, setCore, setBuy, setSoft,
            getMeetingAdv, getMeetingContact, getMeetingSponsor, getMeetingNotice, getMeetingUndertake,
            setMeetingAdv, setMeetingContact, setMeetingSponsor, setMeetingNotice, setMeetingUndertake,
            getTrainAdv, getTrainContact, getTrainSponsor, getTrainNotice, getTrainService,
            setTrainAdv, setTrainContact, setTrainSponsor, setTrainNotice, setTrainService
        } from '@/apis/home';
   const imgSite = apiContextPath + '/upload' ;
   const mapPage =[
        {page: 'situation', word: '公司概况', fun: getSituation,func2:setSituation,backRoute: '/inRuirui'},
        {page: 'culture', word: '公司文化', fun: getCulture,func2:setCulture,backRoute: '/inRuirui'},
        {page: 'event', word: '大事记', fun: getEvents,func2:setEvents,backRoute: '/inRuirui'},
        {page: 'ip', word: '知识产权', fun: getIp,func2:setIp,backRoute: '/inRuirui'},
        {page: 'caltpp1', word: '软件简介', fun: getSoft,func2:setSoft,backRoute: '/caltpp'},
        {page: 'caltpp2', word: '核心功能', fun: getCore,func2:setCore,backRoute: '/caltpp'},
        {page: 'caltpp3', word: '优势与特色', fun: getAdv,func2:setAdv,backRoute: '/caltpp'},
        {page: 'caltpp4', word: '采购流程', fun: getBuy,func2:setBuy,backRoute: '/caltpp'},
        {page: 'meeting1', word: '会议通知', fun: getMeetingNotice,func2:setMeetingNotice,backRoute: '/metting'},
        {page: 'meeting2', word: '承接会议', fun: getMeetingUndertake,func2:setMeetingUndertake,backRoute: '/metting'},
        {page: 'meeting3', word: '优势与特色', fun: getMeetingAdv,func2:setMeetingAdv,backRoute: '/metting'},
        {page: 'meeting4', word: '联系赞助-接洽方式', fun: getMeetingSponsor,func2:setMeetingSponsor,backRoute: '/metting'},
        {page: 'meeting5', word: '接洽方式', fun: getMeetingContact,func2:setMeetingContact,backRoute: '/metting'},
        {page: 'train1', word: '培训通知', fun: getTrainNotice,func2:setTrainNotice,backRoute: '/train'},
        {page: 'train2', word: '服务内容', fun: getTrainService,func2:setTrainService,backRoute: '/train'},
        {page: 'train3', word: '优势与特色', fun: getTrainAdv,func2:setTrainAdv,backRoute: '/train'},
        {page: 'train4', word: '联系赞助-接洽方式', fun: getTrainSponsor,func2:setTrainSponsor,backRoute: '/train'},
        {page: 'train5', word: '接洽方式', fun: getTrainContact,func2:setTrainContact,backRoute: '/train'},
   ]
    export default {
        components: { Editor, Toolbar },
        data () {
            return {
                pageTitle: '',
                editor: null,
                html: '',
                toolbarConfig: {
                    // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
                    // excludeKeys: [ /* 隐藏哪些菜单 */ ],
                },
                editorConfig: {
                    placeholder: '请输入内容...',
                    // autoFocus: false,
                    customAlert: (info) =>{
                        this.$message.info(info);
                    },
                    // 所有的菜单配置，都要在 MENU_CONF 属性下
                    MENU_CONF: {
                        uploadImage:{
                            server: imgSite,
                            fieldName: 'file',
                            meta: {
                                type: 1,
                            },
                            headers: {
                                'access-token': sessionStorage.getItem('access_token')
                            },
                            customInsert(res, insertFn){
                                const url = res.data;
                                insertFn(url, '', '')
                            }
                        },
                        uploadVideo:{
                             server: imgSite,
                            fieldName: 'file',
                            meta: {
                                type: 1,
                            },
                            headers: {
                                'access-token': sessionStorage.getItem('access_token')
                            },
                            customInsert(res, insertFn){
                                const url = res.data;
                                insertFn(url, '')
                            }
                        }
                    }
                }
            };
        },
        mounted () {
            //初始化富文本编辑器
           
        },
        methods: {
            onCreated(editor) {
                this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
                const page = this.$route.params.page;
                mapPage.forEach(item =>{
                    if(page === item.page){
                        this.pageTitle = item.word;
                        this.item = item;
                        item.fun().then(res =>{
                            //this.editorContent =res.data.content;
                            //editor.txt.html(res.data.content);
                            this.html = res.data.content;
                        })
                        
                    }
                })
            },
            onChange(editor) {
                //console.log('onChange', editor.getHtml()) // onChange 时获取编辑器最新内容
            },
            cancelAdd(){
                this.$router.push(this.item.backRoute);
            },
            submitNews(){
                const content = this.html;
                
                if(content){
                    
                    this.item.func2(content).then(res =>{
                        this.$message.success('编辑成功');
                        this.$router.push(this.item.backRoute);
                    })
                    
                }else{
                    this.$message.error('请填充内容');
                }
            },
            
        },
    };
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang='less' scoped>
.newsAdd{
    .title{
        margin:24px 0;
        font-weight: bold;
    }
    .line{
        margin-top:20px;
        .word_desc{
            position: relative;
            top:-20px;
        }
    }
    .btn_box{
        text-align: center;
        margin-top:30px;
    }
}
</style>
<style lang='less'>
.line2{
    .el-input{
        width:auto;
    }
}
.line{
    .el-input{
        width:80%;
    }
    .el-textarea{
        width:80%
    }
}
.upload-demo{
    .el-upload-list{
        display: inline-block;
        vertical-align: middle;
        margin-left: 20px;
        height:36px;
    }
}
</style>