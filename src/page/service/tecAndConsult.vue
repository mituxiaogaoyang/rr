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
            <div class="block">
              <span class="demonstration">开始时间</span>
              <el-date-picker
                v-model="startTime"
                type="datetime"
                value-format="yyyyMMddHHmmss"
                @change="time => getConsultList(1)"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <el-table size="small"  :data="tableData" border>
              <el-table-column
                  label="姓名"
                  prop="name"
                  width="120">
              </el-table-column>
              <el-table-column
                  prop="companyUniversityMechanism"
                  width="150"
                  label="公司/大学/机构名称">
              </el-table-column>
              <el-table-column
                  prop="job"
                  width="140"
                  label="职称">
              </el-table-column>
              <el-table-column
                  prop="email"
                  width="160"
                  label="邮箱">
              </el-table-column>
              <el-table-column
                  prop="createTime"
                  :formatter="dateFormat"
                  width="150"
                  label="创建时间">
              </el-table-column>
              <el-table-column
                  prop="describe"
                  label="问题描述">
              </el-table-column>
              <!-- <el-table-column
                  label="问题类别"
                  width="150">
                  <template slot-scope="scope">
                      <span>{{scope.row.status?'启用':'禁用'}}</span>
                  </template>
              </el-table-column> -->
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
import moment from 'moment';
export default {
  name: "tecAndConsult",
  components:{noticeList},
  data() {
    return {
      startTime:'',
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
          startTime: this.startTime,
      };
      getConsultList(obj).then(res =>{
        const lists = res.items;      
        this.page.total = res.totalCount;
        this.tableData = lists;
      })
    },
    handleCurrentChange(i){
        this.page.current = i;
        this.getConsultList(i);
    },
    dateFormat(row, column) {
        var date = row[column.property];
        if (date == undefined) {
            return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
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
