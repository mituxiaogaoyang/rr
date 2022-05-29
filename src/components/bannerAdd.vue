<template>
  <div id="banner_add">
    <div class="line">
        <div class="word">轮播图位置</div>
        <el-select v-model="type" clearable placeholder="请选择">
            <el-option
            v-for="item in siteList"
            :key="item.type"
            :label="item.title"
            :value="item.type">
            </el-option>
        </el-select>
    </div>
    <div class="line">
        <div class="word">序号</div>
        <el-input-number v-model="sort"  :min="1" :max="6" label="轮播图序号"></el-input-number>
    </div>
    <div class="line">
        <div class="word">轮播展示图片</div>
        <el-upload
            class="upload-demo3 upload-demo2"
            drag
            :action="uploadSite"
            :on-success="uploadSuccess"
            :headers ="headers"
            :data="{type:1}"
            :show-file-list="false">
            <img v-if="picUrl" :src="picUrl" class="avatar">
            <template v-else>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </template>
        </el-upload>
    </div>
    <div class="line">
        <div class="word">链接地址</div>
        <el-input v-model="linkUrl" autocomplete="off"></el-input>
    </div>
    <div class="btn_box">
        <el-button plain @click="cancelAdd">取消</el-button>
        <el-button type="primary" plain @click="submitAdd">确认</el-button>
    </div>
  </div>
</template>

<script>
import {apiContextPath,getBannerDetail,setBannerItem,updateBannerItem} from '@/apis/home';
const imgSite = apiContextPath + '/upload' ;
const siteList =[
    {type:1, title:'上部轮播图'},
    {type:2, title:'中部轮播图'},
]
export default {
    data(){
        return {
            siteList,
            uploadSite: imgSite,
            headers:{
                'access-token':sessionStorage.getItem('access_token')
            },
            picUrl:'',
            type:'',
            sort:'',
            linkUrl:''
        }
    },
    created(){
        if(this.$route.query.id){
            this.getDetail(this.$route.query.id)
        }
    },
    methods:{
        getDetail(id){
            getBannerDetail(id).then(res =>{
                const data = res.data;
                this.picUrl = data.picUrl;
                this.type = data.type;
                this.sort = data.sort;
                this.linkUrl = data.linkUrl;
            });
        },
        uploadSuccess(res,file){
            this.picUrl =  file.response.data;
        },
        cancelAdd(){
            this.$router.push('/banner');
        },
        submitAdd(){
            const {type,sort, linkUrl,picUrl} = this;
            const params = {type,sort, linkUrl,picUrl};
            const id =this.$route.query.id;
            if(id){
                params.id = id;
                updateBannerItem(params).then(res =>{
                    if(res.code === 0){
                        this.$message.success('修改成功');
                        this.$router.push('/banner');
                    }
                })
            }else{
                setBannerItem(params).then(res =>{
                    if(res.code === 0){
                        this.$message.success('添加成功');
                        this.$router.push('/banner');
                    }
                })
            }
            
            
        }
    }

}
</script>

<style lang="less">
#banner_add{
    margin:18px;
    .line{
        margin:20px;
    }
    .btn_box{
        margin:20px;
    }
}
</style>