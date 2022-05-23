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
            :data="{type:2}"
            :show-file-list="false">
            <img v-if="guidePic" :src="guidePic" class="avatar">
            <template v-else>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </template>
        </el-upload>
    </div>
    <div class="line">
        <div class="word">菜单</div>
        <el-select v-model="menuCode" clearable placeholder="请选择" >
            <el-option
            v-for="item in lists"
            :key="item.code"
            :label="item.name"
            :value="item.code">
            </el-option>
        </el-select>
    </div>
    <div class="line">
        <div class="word">菜单ID</div>
        <el-input v-model="linkId" autocomplete="off"></el-input>
    </div>
    <div class="btn_box">
        <el-button plain @click="cancelAdd">取消</el-button>
        <el-button type="primary" plain @click="submitAdd">确认</el-button>
    </div>
  </div>
</template>

<script>
import {apiContextPath,getMenuList,setBannerItem} from '@/apis/home';
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
            guidePic:'',
            lists: [],
            type:'',
            sort:'',
            menuCode:'',
            linkId:''
        }
    },
    created(){
        this.getData();
    },
    methods:{
        getData(){
            getMenuList().then(res =>{
                this.lists = res.data;
            });
        },
        uploadSuccess(res,file){
            this.guidePic =  file.response.data;
        },
        cancelAdd(){
            this.$router.push('/banner');
        },
        submitAdd(){
            const {type,sort,menuCode, linkId,guidePic} = this;
            const params = {type,sort,menuCode, linkId,guidePic};
            setBannerItem(params).then(res =>{
                if(res.code === 0){
                    this.$router.push('/banner');
                }
            })
            
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