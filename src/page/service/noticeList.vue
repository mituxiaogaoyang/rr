<template>
  <div id="notices">
    <div class="ceil">
        <div class="search_box">
            <el-input
                type="text"
                size="small"
                placeholder="请输入标题"
                style="width:180px"
                v-model="title">
            </el-input>
            <span class="label">状态：</span>
            <el-select v-model="status" size="small" style="width:150px" clearable placeholder="请选择" @change="getData(1)">
                <el-option
                v-for="item in statesService"
                :key="item.val"
                :label="item.label"
                :value="item.val">
                </el-option>
            </el-select>
            <el-button type="primary" plain class="btn_add2" size="small" @click="search">搜索</el-button>
        </div>
        <el-button type="primary" plain class="btn_add" @click="() => addList()">新增</el-button>
    </div>
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
        <el-table-column
            prop="createTime"
            label="创建时间"
            :formatter="dateFormat"
            width="240">
        </el-table-column>
        <el-table-column
            prop="address"
            width="250"
            label="操作">
            <template slot-scope="scope">
                <el-button @click="changeStatus(scope.row)" type="text" size="small">{{scope.row.status?'禁用':'启用'}}</el-button>
                <el-button @click="addList(scope.row.id)" type="text" size="small">修改</el-button>
                <el-button @click="remove(scope.row.id)" type="text" size="small">删除</el-button>
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
  </div>
</template>

<script type="text/javascript">
import {statesService,getTrainNotices,getMeetingNotices, changeStatus, deleteNotice} from '@/apis/home';
import moment from 'moment';
export default {
  name: "notices",
  data() {
    return {
      title: '',
      tableData: [],
      statesService,
      status: '',
      page:{
          current: 1,
          total:1
      }
    }
  },
  watch:{
      '$route'(nV){
				this.getData();
      }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(i){ //i -currentpage
        const page = i || 1;
        let obj = {
            page: page,
            title: this.title
        };
				this.status !== '' && (obj.status =this.status);
				const route = this.$route.name; //metting
				this.routePage =  route;
				if(route === 'metting'){
					
					getMeetingNotices(obj).then(res =>{    
							const lists = res.items;      
							this.page.total = res.totalCount;
							this.tableData = lists;
					});
				}else{
					getTrainNotices(obj).then(res =>{    
							const lists = res.items;      
							this.page.total = res.totalCount;
							this.tableData = lists;
					});
				}
        
    },
    search(){
      this.getData(1);
    },
    addList(id){
				console.log(id)
				const type = this.routePage==='metting'?'meeting':'train'; //metting
				let route = '/noticeDetail?type='+type;
				if(id){
					route = route+ '&id=' +id;
				}
				this.$router.push(route);
    },
    handleCurrentChange(i){
        this.page.current = i;
        this.getData(i);
    },
    dateFormat(row, column) {
        var date = row[column.property];
        if (date == undefined) {
            return "";
        }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
		},
		changeStatus(row){
			const type = this.routePage==='metting'?'meeting':'train'; //metting
			const isOpen = row.status?'disable':'enable'; //metting
			changeStatus(row.id, type,isOpen).then(res =>{
				this.$message.success('修改成功');
				this.getData();
			})
		},
		remove(id){
			this.$confirm('确定删除该通知?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
						const type = this.routePage==='metting'?'meeting':'train';
						deleteNotice(id,type).then(res =>{
							this.$message.success('删除成功');
							this.getData();
						})
				
				}).catch(() => {
										
				});
		
		}
  }
}
</script>

<style lang="less" scoped>
#notices{
  .ceil{
      display: flex;
      justify-content: space-between;
  }
}
</style>
