<template>
  <div id="noticeDetail">
    <div class="title">{{typeName + pageName}}</div>
    <div class="line">
        标题 ：
        <el-input v-model="title" autocomplete="off"></el-input>
    </div>
    <div class="line">
        内容：
        <rich-text :content="contentText" ref="richText2" :includeFile="includeFile" :files="fileList"></rich-text>
    </div>
    <div class="btn_box">
        <el-button plain @click="cancelAdd">取消</el-button>
        <el-button type="primary" plain @click="submitNotice">确认</el-button>
        <!-- <el-button type="warning" plain @click="submitNews(1)">发布</el-button> -->
    </div>
  </div>
</template>

<script type="text/javascript">
import {getNoticeDetail,addNotice, updateNotice} from '@/apis/home';
import richText from '../app/richTextSingle.vue';
export default {
  name: "noticeDetail",
  components: {richText},
  data() {
    return {
      title: '',
      contentText:'',
      typeName: '新增',
      pageName: '',
      includeFile:false,
      fileList:[]
    }
  },
  mounted() {
    const id = this.$route.query.id;
    const type =  this.$route.query.type;
    switch(type){
      case 'tec':
        this.pageName = '专家服务介绍';break;
      case 'successcase':
        this.pageName = '成功案例';break;
      case 'meeting':
        this.pageName = '会议通知';
        this.includeFile = true;break;
      case 'train':
        this.pageName = '培训通知';
        this.includeFile = true;break;;
    }
    if(id) {
      this.typeName = '编辑';
      this.getNoticeDetail(id);
    }else{
      this.typeName = '新增';
    }
  },
  methods: {
    getNoticeDetail(id){
      const type =  this.$route.query.type;
      getNoticeDetail(id,type).then(res =>{
        this.title = res.data.title;
        this.contentText = res.data.content;
        this.fileList= res.data.attachmentList;
      })
    },
    submitNotice(){
      const title = this.title;
      const content = this.$refs.richText2.editorContent;
      const fileList = this.$refs.richText2.fileList;
      const params = {content,title};
      if(fileList && fileList.length){
        const nameArr = fileList.map(item => item.name);
        const urlArr = fileList.map(item => item.url);
        params.attachmentNames= nameArr.join(',');
        params.attachmentPaths= urlArr.join(',');
      };
      const id = this.$route.query.id;
      const type =  this.$route.query.type;
      if(title &&  content){
        if(id){ //update
          updateNotice({...params,id},type).then(res =>{
              this.$message.success('修改成功');
              this.$router.go(-1);
          });
        }else{
          addNotice(params,type).then(res =>{
              this.$message.success('新添成功');
              this.$router.go(-1);
          });
        }
      }
    },
    cancelAdd(){
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="less" >
#noticeDetail{
  padding:20px;
  .title{
    color:#000;
    margin:15px 0 30px;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
  }
  .line{
    margin:15px 0;
  }
}
</style>
