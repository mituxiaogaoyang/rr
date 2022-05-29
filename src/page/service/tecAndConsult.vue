<template>
  <div id="tecAndConsult">
    <el-tabs type="border-card">
       <el-tab-pane label="专家服务">
             <notice-list listType="tec"></notice-list>
        </el-tab-pane>
        <el-tab-pane label="成功案例">
            <notice-list listType="successcase"></notice-list>
        </el-tab-pane>
        <el-tab-pane label="科技咨询">
            <el-table size="small"  :data="tableData" border>
              <el-table-column
                  label="序号"
                  type="index"
                  width="90">
              </el-table-column>
              <el-table-column
                  prop="title"
                  show-overflow-tooltip
                  label="标题">
              </el-table-column>

              <el-table-column
                  label="状态"
                  width="150">
                  <template slot-scope="scope">
                      <span>{{scope.row.status?'启用':'禁用'}}</span>
                  </template>
              </el-table-column>
            </el-table>
            <el-pagination
              small
              layout="prev, pager, next"
              :page-size="10"
              :current-page='page.current'
              @current-change="handleCurrentChange"
              :total="page.total">
          </el-pagination>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script type="text/javascript">
import noticeList from './noticeList';
import {getConsultList} from '@/apis/home';
export default {
  name: "tecAndConsult",
  components:{noticeList},
  data() {
    return {
      tableData:[],
      page:{
          current: 1,
          total:1
      }
    }
  },
  mounted() {
    this.getConsultList();
  },
  methods: {
    getConsultList(i){
      const page = i || 1;
      let obj = {
          page: page,  
      };
      getConsultList(obj).then(res =>{
        
      })
    },
    handleCurrentChange(i){
        this.page.current = i;
        this.getConsultList(i);
    },
  }
}
</script>

<style lang="less" scoped>
#tecAndConsult{
  .bar{
    padding:1px 0;
    position: relative;
    border-bottom:1px dashed #ccc;
  }
  .label2{
      font-weight: bold;
      margin:20px 0;
  }
}
</style>
