<template>
  <div id="appDetail">
    <div class="line">
        <div class="label">软件名称</div>
        <el-input v-model="productName" placeholder="建议不超过5个字" :disabled="canEdit"></el-input>
    </div>
    <div class="line" v-if="!canEdit">
        <div class="label">软件排序</div>
        <el-input-number v-model="sort"  :min="1" :max="6" label="序号"></el-input-number>
    </div>
    <div class="line">
        <div class="label">软件简介</div>
        <rich-text :content="introduction" ref="richText1"></rich-text>
    </div>
    <div class="line">
        <div class="label">核心功能</div>
        <rich-text :content="coreFunction" ref="richText2"></rich-text>
    </div>
    <div class="line">
        <div class="label">优势与特色</div>
        <rich-text :content="advantage" ref="richText3"></rich-text>
    </div>
    <div class="line">
        <div class="label">采购流程</div>
        <rich-text :content="purchase" ref="richText4"></rich-text>
    </div>
    <div class="btn_box">
        <el-button plain @click="cancelAdd">取消</el-button>
        <el-button type="primary" plain @click="submitObj">确认</el-button>
        <!-- <el-button type="info" plain @click="previewNews">预览</el-button> -->
    </div>
  </div>
</template>

<script>
import richText from './richTextSingle.vue';
import {addApp, getAppDetail, updateApp, getCaltpp, getAppXC} from '@/apis/home';
const mapPage =[
    // {page: 'situation', word: '公司概况', fun: getSituation,func2:setSituation,backRoute: '/inRuirui'},
    // {page: 'culture', word: '公司文化', fun: getCulture,func2:setCulture,backRoute: '/inRuirui'},
    // {page: 'event', word: '大事记', fun: getEvents,func2:setEvents,backRoute: '/inRuirui'},
];
export default {
    name: 'appDetail',
    components: {richText},
    data(){
        return {
            productName: '',
            introduction: '',
            coreFunction: '',
            advantage: '',
            purchase: '',
            sort: 1,
            canEdit:false
        }
    },
    watch:{
        '$route.query.type'(){
            this.getData();
        }
    },
    created(){
        console.log(this.$route.query)
        const id = this.$route.query.id;
        if(id) this.getDetail(id);
        this.getData();
    },
    methods:{
        getData(){ //获取相场 和caltpp详情
            const type = this.$route.query.type;
            if(type ==1){
                this.canEdit = true;
                this.getCaltpp();
            }else if(type ==2){
                this.getAppXC();
                this.canEdit = true;
            }
        },
        getCaltpp(){
            getCaltpp().then(res =>{
                const {id,name , introduction , coreFunction , advantage ,purchase , sort} = res.data;
               this.productName = name;
               this.introduction = introduction;
               this.coreFunction = coreFunction;
               this.advantage = advantage;
               this.purchase = purchase;
               this.id = id;
            })
        },
        getAppXC(){
            getAppXC().then(res =>{
                const {id,name , introduction , coreFunction , advantage ,purchase , sort} = res.data;
               this.productName = name;
               this.introduction = introduction;
               this.coreFunction = coreFunction;
               this.advantage = advantage;
               this.purchase = purchase;
               this.id = id;
            })
        },
        getDetail(id){
           getAppDetail(id).then(res =>{
               const {name , introduction , coreFunction , advantage ,purchase , sort} = res.data;
               this.productName = name;
               this.introduction = introduction;
               this.coreFunction = coreFunction;
               this.advantage = advantage;
               this.purchase = purchase;
               this.sort = sort;

           })
        },
        cancelAdd(){
            this.$router.go(-1);
        },
        submitObj(){
            const productName = this.productName;
            const introduction = this.$refs.richText1.html;
            const coreFunction = this.$refs.richText2.html;
            const advantage = this.$refs.richText3.html;
            const purchase = this.$refs.richText4.html;
            const type = Number(this.$route.query.type);
            const sort = this.sort;
            if(productName && introduction && coreFunction && advantage && purchase && sort){
                const id = this.$route.query.id;
                if(id || this.canEdit){
                    updateApp({id:id||this.id,productName,introduction,coreFunction,advantage,purchase,type, sort}).then(res =>{
                        this.$message.success('更新成功');
                        if(!this.canEdit) this.cancelAdd();
                    })
                }else{

                    addApp({productName,introduction,coreFunction,advantage,purchase,type, sort}).then(res =>{
                        this.$message.success('添加成功');
                        this.cancelAdd();
                    })
                }
                
            }else{
                this.$message.error('请填充所有内容');
            }
        },
    }

}
</script>

<style lang="less">
#appDetail{
    padding:15px 15px 50px;
    .line{
        margin:20px 0;
    }
}
</style>