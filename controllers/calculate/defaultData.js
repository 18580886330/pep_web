define(function() {
      // 估价对象
      var GuJiaDuiXiangData = {
            n0_GuJiaDuiXiang_XiangMuMingChen: '五栋大楼',
            n0_GuJiaDuiXiang_ZongJia: 0,
            n0_GuJiaDuiXiang_DanJia: 0,
            n0_GuJiaDuiXiang_JiaoYiRiQi: '2016-5-11',
            n0_GuJiaDuiXiang_JiaoYiRiQiv: 100,
            n0_GuJiaDuiXiang_ShiChangZhuangKuang: '稳定',
            n0_GuJiaDuiXiang_ShiChangZhuangKuangS: [],
            n0_GuJiaDuiXiang_JiaoYiZhuangKuang: '正常',
            n0_GuJiaDuiXiang_JiaoYiZhuangKuangS: [],
            n0_GuJiaDuiXiang_ShiChangZhuangKuangv: 100,
            n0_GuJiaDuiXiang_JiaoYiZhuangKuangv: 100,
            n0_GuJiaDuiXiang_ChaoXiang: '南北',
            n0_GuJiaDuiXiang_ChaoXiangv: 100,
            n0_GuJiaDuiXiang_JiaoTongZhuangKuang: '公共交通线路有3路，9路，轨道交通站点为达官营，轨道交通线路有7号线，交通状况较便利',
            n0_GuJiaDuiXiang_JiaoTongZhuangKuangv: 100,
            n0_GuJiaDuiXiang_HuanJingZhuangKuang: '周边有中国人民公安大学，环境状况较好',
            n0_GuJiaDuiXiang_HuanJingZhuangKuangv: 100,
            n0_GuJiaDuiXiang_JiChuSheShiPeiTao: '七通',
            n0_GuJiaDuiXiang_JiChuSheShiPeiTaov: 100,
            n0_GuJiaDuiXiang_GongGongFuWuSheShi: '生活服务设施有北京银行，物美超市，北京华联广安门购物中心，北京市广外医院，教育配套有红山幼儿园，北京市第十四中学分校，北京市西城区天宁寺小学，有北京莲花池公园，公共服务设施较完善',
            n0_GuJiaDuiXiang_GongGongFuWuSheShiv: 100,
            n0_GuJiaDuiXiang_JianZhuMianJi: 280,
            n0_GuJiaDuiXiang_JianZhuMianJiv: 100,
            n0_GuJiaDuiXiang_CheWei: '较充足',
            n0_GuJiaDuiXiang_CheWeiv: 100,
            n0_GuJiaDuiXiang_WuYeGuanLi: '物业管理水平较好',
            n0_GuJiaDuiXiang_WuYeGuanLiv: 100,
            n0_GuJiaDuiXiang_XiaoQuHuanJing: '绿地',
            n0_GuJiaDuiXiang_XiaoQuHuanJingv: 100,
            n0_GuJiaDuiXiang_JianZhuLeiBie: '塔楼',
            n0_GuJiaDuiXiang_JianZhuLeiBiev: 100,
            n0_GuJiaDuiXiang_JianZhuJieGou: '钢混结构',
            n0_GuJiaDuiXiang_JianZhuJieGouv: 100,
            n0_GuJiaDuiXiang_JianChengNianDai: 2005,
            n0_GuJiaDuiXiang_JianChengNianDaiv: 100,
            n0_GuJiaDuiXiang_SheShiSheBei: '有消防设施，电梯3部',
            n0_GuJiaDuiXiang_SheShiSheBeiv: 100,
            n0_GuJiaDuiXiang_HuXing: '三居室',
            n0_GuJiaDuiXiang_HuXingv: 100,
            n0_GuJiaDuiXiang_SuoZaiCengZongLouCeng: '4/10',
            n0_GuJiaDuiXiang_SuoZaiCengZongLouCengv: 100,
            n0_GuJiaDuiXiang_ZhuangXiuZhuangKuang: '普通装修',
            n0_GuJiaDuiXiang_ZhuangXiuZhuangKuangv: 100,
            n0_GuJiaDuiXiang_QiTaYinSu: '无',
            n0_GuJiaDuiXiang_QiTaYinSuv: 100,
            n0_GuJiaDuiXiang_QuanYiZhuangKuang: '设定无其他权利',
            n0_GuJiaDuiXiang_QuanYiZhuangKuangv: 100,
            n0_GuJiaDuiXiang_BiJiaoFaPingGuDanJia: ''
      }
      // 导入案例弹窗数据
      var ImportCaseData = {
            n0_ImportCase_projectName: '',
            n0_ImportCase_projectNameS: [],
            n0_ImportCase_HuXingS: [],
            n0_ImportCase_AnLiLaiYuanS: [],
            n0_ImportCase_ChaoXiangS: [],
            n0_ImportCase_ZhuangXiuQingKuangS: []
      }

      // 可比实例1
      var KeBiShiLi1Data = {
            n0_KeBiShiLi1_XiangMuMingChen: '',
            n0_KeBiShiLi1_ZongJia: '',
            n0_KeBiShiLi1_DanJia: '',
            n0_KeBiShiLi1_JiaoYiRiQi: '',
            n0_KeBiShiLi1_JiaoYiRiQiv: 100,
            n0_KeBiShiLi1_ShiChangZhuangKuang: '',
            n0_KeBiShiLi1_ShiChangZhuangKuangS: [],
            n0_KeBiShiLi1_JiaoYiZhuangKuang: '',
            n0_KeBiShiLi1_JiaoYiZhuangKuangS: [],
            n0_KeBiShiLi1_ShiChangZhuangKuangv: 100,
            n0_KeBiShiLi1_JiaoYiZhuangKuangv: 100,
            n0_KeBiShiLi1_ChaoXiang: '',
            n0_KeBiShiLi1_ChaoXiangv: 100,
            n0_KeBiShiLi1_JiaoTongZhuangKuang: '',
            n0_KeBiShiLi1_JiaoTongZhuangKuangv: 100,
            n0_KeBiShiLi1_HuanJingZhuangKuang: '',
            n0_KeBiShiLi1_HuanJingZhuangKuangv: 100,
            n0_KeBiShiLi1_JiChuSheShiPeiTao: '',
            n0_KeBiShiLi1_JiChuSheShiPeiTaov: 100,
            n0_KeBiShiLi1_GongGongFuWuSheShi: '',
            n0_KeBiShiLi1_GongGongFuWuSheShiv: 100,
            n0_KeBiShiLi1_JianZhuMianJi: '',
            n0_KeBiShiLi1_JianZhuMianJiv: 100,
            n0_KeBiShiLi1_CheWei: '',
            n0_KeBiShiLi1_CheWeiv: 100,
            n0_KeBiShiLi1_WuYeGuanLi: '',
            n0_KeBiShiLi1_WuYeGuanLiv: 100,
            n0_KeBiShiLi1_XiaoQuHuanJing: '',
            n0_KeBiShiLi1_XiaoQuHuanJingv: 100,
            n0_KeBiShiLi1_JianZhuLeiBie: '',
            n0_KeBiShiLi1_JianZhuLeiBiev: 100,
            n0_KeBiShiLi1_JianZhuJieGou: '',
            n0_KeBiShiLi1_JianZhuJieGouv: 100,
            n0_KeBiShiLi1_JianChengNianDai: '',
            n0_KeBiShiLi1_JianChengNianDaiv: 100,
            n0_KeBiShiLi1_SheShiSheBei: '',
            n0_KeBiShiLi1_SheShiSheBeiv: 100,
            n0_KeBiShiLi1_HuXing: '',
            n0_KeBiShiLi1_HuXingv: 100,
            n0_KeBiShiLi1_SuoZaiCengZongLouCeng: '',
            n0_KeBiShiLi1_SuoZaiCengZongLouCengv: 100,
            n0_KeBiShiLi1_ZhuangXiuZhuangKuang: '',
            n0_KeBiShiLi1_ZhuangXiuZhuangKuangv: 100,
            n0_KeBiShiLi1_QiTaYinSu: '',
            n0_KeBiShiLi1_QiTaYinSuv: 100,
            n0_KeBiShiLi1_QuanYiZhuangKuang: '',
            n0_KeBiShiLi1_QuanYiZhuangKuangv: 100,
            n0_KeBiShiLi1_XiuZhengXiShu: '',
            n0_KeBiShiLi1_BiZhunJiaZhi: '',
            n0_KeBiShiLi1_TID: ''
      }

      // 可比实例2
      var KeBiShiLi2Data = {
            n0_KeBiShiLi2_XiangMuMingChen: '',
            n0_KeBiShiLi2_ZongJia: '',
            n0_KeBiShiLi2_DanJia: '',
            n0_KeBiShiLi2_JiaoYiRiQi: '',
            n0_KeBiShiLi2_JiaoYiRiQiv: 100,
            n0_KeBiShiLi2_ShiChangZhuangKuang: '',
            n0_KeBiShiLi2_ShiChangZhuangKuangS: [],
            n0_KeBiShiLi2_JiaoYiZhuangKuang: '',
            n0_KeBiShiLi2_JiaoYiZhuangKuangS: [],
            n0_KeBiShiLi2_ShiChangZhuangKuangv: 100,
            n0_KeBiShiLi2_JiaoYiZhuangKuangv: 100,
            n0_KeBiShiLi2_ChaoXiang: '',
            n0_KeBiShiLi2_ChaoXiangv: 100,
            n0_KeBiShiLi2_JiaoTongZhuangKuang: '',
            n0_KeBiShiLi2_JiaoTongZhuangKuangv: 100,
            n0_KeBiShiLi2_HuanJingZhuangKuang: '',
            n0_KeBiShiLi2_HuanJingZhuangKuangv: 100,
            n0_KeBiShiLi2_JiChuSheShiPeiTao: '',
            n0_KeBiShiLi2_JiChuSheShiPeiTaov: 100,
            n0_KeBiShiLi2_GongGongFuWuSheShi: '',
            n0_KeBiShiLi2_GongGongFuWuSheShiv: 100,
            n0_KeBiShiLi2_JianZhuMianJi: '',
            n0_KeBiShiLi2_JianZhuMianJiv: 100,
            n0_KeBiShiLi2_CheWei: '',
            n0_KeBiShiLi2_CheWeiv: 100,
            n0_KeBiShiLi2_WuYeGuanLi: '',
            n0_KeBiShiLi2_WuYeGuanLiv: 100,
            n0_KeBiShiLi2_XiaoQuHuanJing: '',
            n0_KeBiShiLi2_XiaoQuHuanJingv: 100,
            n0_KeBiShiLi2_JianZhuLeiBie: '',
            n0_KeBiShiLi2_JianZhuLeiBiev: 100,
            n0_KeBiShiLi2_JianZhuJieGou: '',
            n0_KeBiShiLi2_JianZhuJieGouv: 100,
            n0_KeBiShiLi2_JianChengNianDai: '',
            n0_KeBiShiLi2_JianChengNianDaiv: 100,
            n0_KeBiShiLi2_SheShiSheBei: '',
            n0_KeBiShiLi2_SheShiSheBeiv: 100,
            n0_KeBiShiLi2_HuXing: '',
            n0_KeBiShiLi2_HuXingv: 100,
            n0_KeBiShiLi2_SuoZaiCengZongLouCeng: '',
            n0_KeBiShiLi2_SuoZaiCengZongLouCengv: 100,
            n0_KeBiShiLi2_ZhuangXiuZhuangKuang: '',
            n0_KeBiShiLi2_ZhuangXiuZhuangKuangv: 100,
            n0_KeBiShiLi2_QiTaYinSu: '',
            n0_KeBiShiLi2_QiTaYinSuv: 100,
            n0_KeBiShiLi2_QuanYiZhuangKuang: '',
            n0_KeBiShiLi2_QuanYiZhuangKuangv: 100,
            n0_KeBiShiLi2_XiuZhengXiShu: '',
            n0_KeBiShiLi2_BiZhunJiaZhi: '',
            n0_KeBiShiLi2_TID: ''
      }

      // 可比实例3
      var KeBiShiLi3Data = {
            n0_KeBiShiLi3_XiangMuMingChen: '',
            n0_KeBiShiLi3_ZongJia: '',
            n0_KeBiShiLi3_DanJia: '',
            n0_KeBiShiLi3_JiaoYiRiQi: '',
            n0_KeBiShiLi3_JiaoYiRiQiv: 100,
            n0_KeBiShiLi3_ShiChangZhuangKuang: '',
            n0_KeBiShiLi3_ShiChangZhuangKuangS: [],
            n0_KeBiShiLi3_JiaoYiZhuangKuang: '',
            n0_KeBiShiLi3_JiaoYiZhuangKuangS: [],
            n0_KeBiShiLi3_ShiChangZhuangKuangv: 100,
            n0_KeBiShiLi3_JiaoYiZhuangKuangv: 100,
            n0_KeBiShiLi3_ChaoXiang: '',
            n0_KeBiShiLi3_ChaoXiangv: 100,
            n0_KeBiShiLi3_JiaoTongZhuangKuang: '',
            n0_KeBiShiLi3_JiaoTongZhuangKuangv: 100,
            n0_KeBiShiLi3_HuanJingZhuangKuang: '',
            n0_KeBiShiLi3_HuanJingZhuangKuangv: 100,
            n0_KeBiShiLi3_JiChuSheShiPeiTao: '',
            n0_KeBiShiLi3_JiChuSheShiPeiTaov: 100,
            n0_KeBiShiLi3_GongGongFuWuSheShi: '',
            n0_KeBiShiLi3_GongGongFuWuSheShiv: 100,
            n0_KeBiShiLi3_JianZhuMianJi: '',
            n0_KeBiShiLi3_JianZhuMianJiv: 100,
            n0_KeBiShiLi3_CheWei: '',
            n0_KeBiShiLi3_CheWeiv: 100,
            n0_KeBiShiLi3_WuYeGuanLi: '',
            n0_KeBiShiLi3_WuYeGuanLiv: 100,
            n0_KeBiShiLi3_XiaoQuHuanJing: '',
            n0_KeBiShiLi3_XiaoQuHuanJingv: 100,
            n0_KeBiShiLi3_JianZhuLeiBie: '',
            n0_KeBiShiLi3_JianZhuLeiBiev: 100,
            n0_KeBiShiLi3_JianZhuJieGou: '',
            n0_KeBiShiLi3_JianZhuJieGouv: 100,
            n0_KeBiShiLi3_JianChengNianDai: '',
            n0_KeBiShiLi3_JianChengNianDaiv: 100,
            n0_KeBiShiLi3_SheShiSheBei: '',
            n0_KeBiShiLi3_SheShiSheBeiv: 100,
            n0_KeBiShiLi3_HuXing: '',
            n0_KeBiShiLi3_HuXingv: 100,
            n0_KeBiShiLi3_SuoZaiCengZongLouCeng: '',
            n0_KeBiShiLi3_SuoZaiCengZongLouCengv: 100,
            n0_KeBiShiLi3_ZhuangXiuZhuangKuang: '',
            n0_KeBiShiLi3_ZhuangXiuZhuangKuangv: 100,
            n0_KeBiShiLi3_QiTaYinSu: '',
            n0_KeBiShiLi3_QiTaYinSuv: 100,
            n0_KeBiShiLi3_QuanYiZhuangKuang: '',
            n0_KeBiShiLi3_QuanYiZhuangKuangv: 100,
            n0_KeBiShiLi3_XiuZhengXiShu: '',
            n0_KeBiShiLi3_BiZhunJiaZhi: '',
            n0_KeBiShiLi3_TID: ''
      }

      // 市场价格确定
      var ShiChangJiaGeQueDingData = {
            n0_ShiChangJiaGeQueDing_FangFa1: '比较法',
            n0_ShiChangJiaGeQueDing_FangFa1S: ['比较法', '收益法', '成本法'],
            n0_ShiChangJiaGeQueDing_FangFa2: '比较法',
            n0_ShiChangJiaGeQueDing_FangFa2S: ['比较法', '收益法', '成本法'],
            n0_ShiChangJiaGeQueDing_CeSuanJieGuo1: 0,
            n0_ShiChangJiaGeQueDing_CeSuanJieGuo2: 0,
            n0_ShiChangJiaGeQueDing_ChaEBiLi: 0,
            n0_ShiChangJiaGeQueDing_ShiChangJiaZhi: 0,
            n0_ShiChangJiaGeQueDing_JianZhuMianJi: 0,
            n0_ShiChangJiaGeQueDing_QuanZhongHouDanJia: 0,
            n0_ShiChangJiaGeQueDing_QuanZhong1: 0.9,
            n0_ShiChangJiaGeQueDing_QuanZhong2: 0.1,
            n0_ShiChangJiaGeQueDing_QuanZhong1S: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0]
      }

      // 抵押价格确定
      var DiYaJiaGeQueDingData = {
            n0_DiYaJiaGeQueDing_ChuRangJinKouChuHouDeDanJia: 0,
            n0_DiYaJiaGeQueDing_ChuRangJinKouChuHouDeZongJia: 0,
            n0_DiYaJiaGeQueDing_DiYaDanJia: 0,
            n0_DiYaJiaGeQueDing_DiYaZongJia: 0,
            n0_DiYaJiaGeQueDing_KouChuShuiFeiHouDeDanJia: 0,
            n0_DiYaJiaGeQueDing_KouChuShuiFeiHouDeZongJia: 0,
            n0_DiYaJiaGeQueDing_ShiChangJiaZhiShiFuKouChuChuRangJin: '是',
            n0_DiYaJiaGeQueDing_ShiChangJiaZhiShiFuKouChuChuRangJinS: ['是', '否'],
            n0_DiYaJiaGeQueDing_ShangWeiBuJiaoDeChuRangJinJinE: 0,
            n0_DiYaJiaGeQueDing_QiTaFaDingYouXianShouChangKuan: 0,
            n0_DiYaJiaGeQueDing_TuoQianDeJianSheGongChengJiaKuan: 0,
            n0_DiYaJiaGeQueDing_YiDiYaDanBaoDeZhaiQuanShuE: 1,
            n0_DiYaJiaGeQueDing_CeSuanJingZhi: 0,
            n0_DiYaJiaGeQueDing_ShiFuCeSuanJingZhi: '是',
            n0_DiYaJiaGeQueDing_ShiFuCeSuanJingZhiS: ['是', '否'],
            n0_DiYaJiaGeQueDing_JianZhuWuJiaZhi: 0,
            n0_DiYaJiaGeQueDing_JianZhuWuJiaZhiBaiFenBi: 0,
            n0_DiYaJiaGeQueDing_TuDiJiaZhi: 0,
            n0_DiYaJiaGeQueDing_TuDiJiaZhiBaiFenBi: 0,
            n0_DiYaJiaGeQueDing_TuDiJiaZhiBaiFenBiS: [1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0]
      }

      // 方法理由
      var FangFaLiYouData = {
            n0_FangFaLiYou_QuanZhongQueDingLiYou: '市场法是依据替代原理，根据较近时期内与估价对象类似的可比交易实例进行比较分析，考虑交易时间、交易情况、实物状况、权益状况、区位状况差异，求得的估价对象比准价值，是居住房地产估价常用的方法。基于上述分析，确定比较法的权重为*%，收益法的权重为*%。 ',
            n0_FangFaLiYou_ChuRangJinShiFuKouChuDeLiYou: '估价对象产权性质为成本价，根据《**》文件，需补缴出让金***元（需补交出让金比例按实际成交金额的**%计算），估价委托人于价值时点已补交出让金***元，故本次估价结果扣除尚未补缴的出让金共计****元。（因买卖双方在办理相关产权变更手续时需缴清相应的差价和出让金，故本次估价不予考虑。）',
            n0_FangFaLiYou_BiJiaoFaFangFaLiYou1: '比较法是指根据替代原则，将在同一市场供需圈内近期发生的、具有可比性的交易案例与估价对象的交易情况、期日、区域以及个别因素进行比较修正，得出估价对象在价值时点时的市场价值。与估价对象处于同一供需圈内的类似房地产交易案例较多，故可采用比较法进行评估。 ',
            n0_FangFaLiYou_ShouYiFaFangFaLiYou2: '收益法是将估价对象未来若干年的纯收益通过一定的报酬率将其还原成价值时点的现值的一种方法。与估价对象处于同一供需圈内的类似房地产出租情况较多，客观租金较易获取，故可采用收益法进行评估。',
            n0_FangFaLiYou_ChengBenFaFangFaLiYou3: '由于成本法是以重新开发建设成本为导向求取房地产价值，适用于无市场或市场依据不充分的房地产估价。估价对象所在区域市场依据充分，因此实际未选用成本法。'
      }

      //收益法
      var ShouYiFaData = {
            n0_ShouYiFa_BaoChouLvf: 0.0, //报酬率f  
            n0_ShouYiFa_BaoXianFei: 0.0, //保险费   
            n0_ShouYiFa_BaoXianFeif: 0.0, //保险费f
            n0_ShouYiFa_ChengZhenTuDiShiYongShui: 0.0, //城镇土地使用税
            n0_ShouYiFa_DiZengNianXian: 0, //递增年限
            n0_ShouYiFa_FangChanShui: 0.0, //房产税
            n0_ShouYiFa_FangChanShuif: '', //房产税f
            n0_ShouYiFa_FangDiChanJiaZhiCeSuanJieGuo: 0, //房地产价值测算结果
            n0_ShouYiFa_GeRenZongHeShuiFei: 0.0, //个人综合税费
            n0_ShouYiFa_GeRenZongHeShuiFeif: 0.0, //个人综合税费f  
            n0_ShouYiFa_GuanLiFei: 0.0, //管理费    
            n0_ShouYiFa_GuanLiFeif: 0.0, //管理费f  
            n0_ShouYiFa_KeHuoShouYiNianXian: 0, //可获收益年限 
            n0_ShouYiFa_KongZhiQi: 0, //控制期  
            n0_ShouYiFa_MeiPingMiTuDiNaShuiEf: '', //每平米土地纳税额f   
            n0_ShouYiFa_NianFangDiChanJingShouYi: 0.0, //年房地产净收益 
            n0_ShouYiFa_NianFangDiChanQianZaiMaoShouYi: 0.0, //年房地产潜在毛收益
            n0_ShouYiFa_NianFangDiChanYouXiaoMaoShouYi: 0.0, //年房地产有效毛收益
            n0_ShouYiFa_NianZongFeiYong: 0.0, //年总费用 
            n0_ShouYiFa_QiTaShouRu: 0.0, //其他收入  
            n0_ShouYiFa_RiZuJin: 0.0, //日租金  
            n0_ShouYiFa_RongJiLvf: '', //容积率f    
            n0_ShouYiFa_ShiFuZuJinDiZengS: ['是', '否'], //是否租金递增
            n0_ShouYiFa_ShiFuZuJinDiZeng: '是', //是否租金递增
            n0_ShouYiFa_WeiXiuFei: 0.0, //维修费    
            n0_ShouYiFa_WeiXiuFeif: 0.0, //维修费f  
            n0_ShouYiFa_YaJinBaoZhengJin: 0.0, //押金保证金   
            n0_ShouYiFa_YaJinBaoZhengJinf: 0.0, //押金保证金f 
            n0_ShouYiFa_YinHuaShui: 0.0, //印花税   
            n0_ShouYiFa_YinHuaShuif: 0.0, //印花税f 
            n0_ShouYiFa_YueZuJin: 0, //月租金   
            n0_ShouYiFa_ZuJinDiZengBiLvf: 0.0 //租金递增比率f  
      }

      // 成本法
      var ChengBenFaData = {
            n0_ChengBenFa_TouZiLiXi: 0.0, // 投资利息
            n0_ChengBenFa_FangDiChanDanJia: 0, // 房地产单价
            n0_ChengBenFa_CanZhiLv: 0.0, // 残值率
            n0_ChengBenFa_JianZhuWuJingJiShouMing: 0.0, // 建筑物经济寿命
            n0_ChengBenFa_JianZhuWuZhongXinGouJianJiaGe: 0.0, // 建筑物重新构建价格
            n0_ChengBenFa_JianZhuWuZheJiu: 0.0, // 建筑物折旧
            n0_ChengBenFa_QiTaTeShuQingKuang: 0.0, // 其他特殊情况
            n0_ChengBenFa_ShuiXi: 0, // 水系
            n0_ChengBenFa_ShuiXiS: [0, 10], // 水系
            n0_ChengBenFa_ZhongXiaoXueMingXiao: 0, // 中小学名校
            n0_ChengBenFa_ZhongXiaoXueMingXiaoS: [0, 10], // 中小学名校
            n0_ChengBenFa_GuiDaoJiaoTongZhanDianZhouBian500MiYiXia: 0, // 轨道交通站点周边500米以下
            n0_ChengBenFa_GuiDaoJiaoTongZhanDianZhouBian500MiYiXiaS: [0, 10],
            n0_ChengBenFa_GuiDaoJiaoTongZhanDianZhouBian500MiYiShang: 0, // 轨道交通站点周边500米以上
            n0_ChengBenFa_GuiDaoJiaoTongZhanDianZhouBian500MiYiShangS: [0, 10], // 轨道交通站点周边500米以上
            n0_ChengBenFa_GongYuan: 0, // 公园
            n0_ChengBenFa_GongYuanS: [0, 10], // 公园
            n0_ChengBenFa_YinSuXiuZhengXiShu: 0.0, // 因素修正系数
            n0_ChengBenFa_RongJiLvXiuZhengXiShu: 0.0, // 容积率修正系数
            n0_ChengBenFa_RongJiLvXiuZhengXiShuf: 0.0, // 容积率修正系数f
            n0_ChengBenFa_FaDingChuRangZuiGaoNianXian: 0.0, // 法定出让最高年限
            n0_ChengBenFa_ShengYuDeTuDiShiYongNianXian: 0.0, // 剩余的土地使用年限
            n0_ChengBenFa_YiNianQiDaiKuanLiLv: 0.0, // 一年期贷款利率
            n0_ChengBenFa_NianQiXiuZhengXiShu: 0.0, // 年期修正系数
            n0_ChengBenFa_QiRiXiuZhengXiShu: 0.0, // 期日修正系数
            n0_ChengBenFa_YongTuXiuZhengXiShu: 1, // 用途修正系数
            n0_ChengBenFa_YongTuXiuZhengXiShuS: [1, 1.5], // 用途修正系数
            n0_ChengBenFa_DiXiaKongJianXiuZhengXiShu: 1, // 地下空间修正系数
            n0_ChengBenFa_KaiFaChengDuChaYiXiuZhengZhi: 0.0, // 开发程度差异修正值
            n0_ChengBenFa_KaiFaChengDuChaYiZhi: 0, // 开发程度差异值
            n0_ChengBenFa_JiBieRongJiLv: 0.0, // 级别容积率
            n0_ChengBenFa_ShiYongDeJiZhunDiJiaLouMianShuDiJia: 0, //  适用的基准地价楼面熟地价
            n0_ChengBenFa_PianQuBianHao: '1', //片区编号
            n0_ChengBenFa_PianQuBianHaoS: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '通1', '通2', '通3', '通4', '顺1', '顺2', '顺3', '顺4', '兴1', '兴2', '兴3', '兴4', '兴5', '昌1', '昌2', '昌3', '昌4', '昌5', '昌南', '亦1', '门1', '门2', '门军', '门斋', '门潭', '房1', '房2', '房3', '房4', '平1', '平2', '平3', '平4', '怀1', '怀2', '怀3', '密1', '密2', '密3', '延1', '延2'], //片区编号
            n0_ChengBenFa_JiZhunDiJiaJiBie: '1', // 基准地价级别
            n0_ChengBenFa_JiZhunDiJiaJiBieS: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], // 基准地价级别
            n0_ChengBenFa_TuDiYongTu: '', // 土地用途
            n0_ChengBenFa_TuDiQuDeShuiFei: 0.0, // 土地取得税费
            n0_ChengBenFa_TuDiQuDeShuiFeif: 0.0, // 土地取得税费f
            n0_ChengBenFa_TuDiShiYongQuanLouMianShuDiJia: 0.0, // 土地使用权楼面熟地价
            n0_ChengBenFa_TuDiQuDeChengBen: 0.0, // 土地取得成本
            n0_ChengBenFa_GongGongPeiTaoSheShiJianSheFei: 0.0, // 公共配套设施建设费
            n0_ChengBenFa_GongGongPeiTaoSheShiJianSheFeif: 0, // 公共配套设施建设费f
            n0_ChengBenFa_GuanLiFeiYong: 0.0, // 管理费用
            n0_ChengBenFa_GuanLiFeiYongf: 0, // 管理费用f
            n0_ChengBenFa_DaiKuanLiLvf: 0, // 贷款利率f
            n0_ChengBenFa_JianZhuAnZhuangGongChengFei: 0, // 建筑安装工程费
            n0_ChengBenFa_JiChuSheShiJianSheFei: 0.0, // 基础设施建设费
            n0_ChengBenFa_JiChuSheShiJianSheFeif: 0, // 基础设施建设费f
            n0_ChengBenFa_KaiFaChengBen: 0.0, // 开发成本
            n0_ChengBenFa_KaiFaLiRun: 0.0, // 开发利润
            n0_ChengBenFa_KaiFaLiRunf: 0, // 开发利润f
            n0_ChengBenFa_KaiFaNianXianf: 0, // 开发年限f
            n0_ChengBenFa_KaiFaQiJianShuiFei: 0.0, // 开发期间税费
            n0_ChengBenFa_KaiFaQiJianShuiFeif: 0, // 开发期间税费f
            n0_ChengBenFa_KanChaSheJi: 0.0, // 勘查设计
            n0_ChengBenFa_KanChaSheJif: 0, // 勘察设计f
            n0_ChengBenFa_QianQiGongChengFei: 0.0, // 前期工程费
            n0_ChengBenFa_QianQiGongChengFeif: 0.0, // 前期工程费f
            n0_ChengBenFa_XiaoShouFeiYong: 0.0, // 销售费用
            n0_ChengBenFa_XiaoShouFeiYongf: 0, // 销售费用f
            n0_ChengBenFa_XiaoShouShuiFei: 0.0, // 销售税费
            n0_ChengBenFa_XiaoShouShuiFeif: 0.0, // 销售税费f
            n0_ChengBenFa_YinSuXiuZhengXiShuf: 0.0, // 因素修正系数f
            n0_ChengBenFa_YouXiaoNianLing: 0 // 有效年龄
      }

      // 现场勘查
      var XianChangKanChaData = {
            n0_XianChangKanCha_WuLiJieGouQingKuang: '', // 物理结构情况
            n0_XianChangKanCha_WuLiJieGouShiFuBianHua: '有变化', // 物理结构是否变化
            n0_XianChangKanCha_ShiFuRuHu: '', // 是否入户
            n0_XianChangKanCha_QiTaYingXiangYinSu: '', // 其他影响因素
            n0_XianChangKanCha_WanSunZhuangKuang: '', // 完损状况
            n0_XianChangKanCha_WanSunZhuangKuangS: [], // 完损状况
            n0_XianChangKanCha_ShiYongJiWeiXiuZhuangKuang: '好', // 使用及维修状况
            n0_XianChangKanCha_DianTiShuLiang: '', // 电梯数量
            n0_XianChangKanCha_XiaoFangSheShi: '', // 消防设施
            n0_XianChangKanCha_24XiaoShiReShui: '', // 24小时热水
            n0_XianChangKanCha_Chuang: '', // 窗
            n0_XianChangKanCha_ChuangS: '', // 窗
            n0_XianChangKanCha_Men: '', // 门
            n0_XianChangKanCha_MenS: '', // 门
            n0_XianChangKanCha_ChuFangQiTa: '', //厨房其他
            n0_XianChangKanCha_ChuFangQiTaS: '', //厨房其他
            n0_XianChangKanCha_ChuFangDiMian: '', //厨房地面
            n0_XianChangKanCha_ChuFangDiMianS: '', //厨房地面
            n0_XianChangKanCha_ChuFangQiangMian: '', // 厨房墙面
            n0_XianChangKanCha_ChuFangQiangMianS: '', // 厨房墙面
            n0_XianChangKanCha_ChuFangDingPeng: '', // 厨房顶棚
            n0_XianChangKanCha_ChuFangDingPengS: '', // 厨房顶棚
            n0_XianChangKanCha_WeiShengJianQiTa: '', // 卫生间其他
            n0_XianChangKanCha_WeiShengJianQiTaS: '', // 卫生间其他
            n0_XianChangKanCha_WeiShengJianDiMian: '', // 卫生间地面
            n0_XianChangKanCha_WeiShengJianDiMianS: '', // 卫生间地面
            n0_XianChangKanCha_WeiShengJianQiangMian: '', // 卫生间墙面
            n0_XianChangKanCha_WeiShengJianQiangMianS: '', // 卫生间墙面
            n0_XianChangKanCha_WeiShengJianDingPeng: '', // 卫生间顶棚
            n0_XianChangKanCha_WeiShengJianDingPengS: '', // 卫生间顶棚
            n0_XianChangKanCha_WoShiQiTa: '', // 卧室其他
            n0_XianChangKanCha_WoShiQiTaS: '', // 卧室其他
            n0_XianChangKanCha_WoShiDiMian: '', // 卧室地面
            n0_XianChangKanCha_WoShiDiMianS: '', // 卧室地面
            n0_XianChangKanCha_WoShiQiangMian: '', // 卧室墙面
            n0_XianChangKanCha_WoShiQiangMianS: '', // 卧室墙面
            n0_XianChangKanCha_WoShiDingPeng: '', // 卧室顶棚
            n0_XianChangKanCha_WoShiDingPengS: '', // 卧室顶棚
            n0_XianChangKanCha_KeTingQiTa: '', // 客厅其他
            n0_XianChangKanCha_KeTingQiTaS: '', // 客厅其他
            n0_XianChangKanCha_KeTingDiMian: '', //客厅地面
            n0_XianChangKanCha_KeTingDiMianS: '', //客厅地面
            n0_XianChangKanCha_KeTingQiangMian: '', // 客厅墙面
            n0_XianChangKanCha_KeTingQiangMianS: '', // 客厅墙面
            n0_XianChangKanCha_KeTingDingPeng: '', // 客厅顶棚
            n0_XianChangKanCha_KeTingDingPengS: '', // 客厅顶棚
            n0_XianChangKanCha_ZhuangXiuChengDu: '', // 装修程度
            n0_XianChangKanCha_ZhuangXiuChengDuS: '', // 装修程度
            n0_XianChangKanCha_KongJianBuJu: '', // 空间布局
            n0_XianChangKanCha_HuXing: '', // 户型
            n0_XianChangKanCha_HuXingS: '', // 户型
            n0_XianChangKanCha_JingGuanFang: '', // 景观房
            n0_XianChangKanCha_TongFengJiCaiGuangZhuangKuang: '', // 通风及采光状况
            n0_XianChangKanCha_LiYongXianZhuang: '', // 利用现状
            n0_XianChangKanCha_ShiJiYongTu: '', // 实际用途
            n0_XianChangKanCha_ShiJiYongTuS: '', // 实际用途
            n0_XianChangKanCha_CengGao: '', // 层高
            n0_XianChangKanCha_ZongLouCeng: '', // 总楼层
            n0_XianChangKanCha_JianChengNianDai: '', // 建成年代
            n0_XianChangKanCha_GongGongBuFenZhuangXiu: '', // 公共部分装修
            n0_XianChangKanCha_GongGongBuFenZhuangXiuS: [], // 公共部分装修
            n0_XianChangKanCha_WaiLiMianZhuangShi: '', // 外立面装饰
            n0_XianChangKanCha_WaiLiMianZhuangShiS: '', // 外立面装饰
            n0_XianChangKanCha_JianZhuLeiBie: '', // 建筑类别
            n0_XianChangKanCha_JianZhuLeiBieS: '', // 建筑类别
            n0_XianChangKanCha_CheWei: '', // 车位
            n0_XianChangKanCha_MenJinXiTong: '', // 门禁系统
            n0_XianChangKanCha_XiaoQuJianShiXiTong: '', // 小区监视系统
            n0_XianChangKanCha_24XiaoShiBaoAn: '', // 24小时保安
            n0_XianChangKanCha_WuYeGuanLiFei: '', // 物业管理费
            n0_XianChangKanCha_WuYeGuanLiShuiPing: '', // 物业管理水平
            n0_XianChangKanCha_RuZhuLv: '', // 入住率
            n0_XianChangKanCha_XiaoQuHuanJing: '', // 小区环境
            n0_XianChangKanCha_XiaoQuHuanJingS: '', // 小区环境
            n0_XianChangKanCha_XiaoQuMingChen: '', // 小区名称
            n0_XianChangKanCha_ChangDiPingZhengQingKuang: '', // 场地平整情况
            n0_XianChangKanCha_KaiFaChengDu: '', // 开发程度
            n0_XianChangKanCha_KaiFaChengDuS: [], // 开发程度
            n0_XianChangKanCha_QiTongYiPing: '', // 七通一平
            n0_XianChangKanCha_QiTongYiPingS: [], // 七通一平
            n0_XianChangKanCha_DiShi: '', // 地势
            n0_XianChangKanCha_DiXing: '', // 地形
            n0_XianChangKanCha_ZongDiXingZhuang: '', // 宗地形状
            n0_XianChangKanCha_BeiZhi: '', // 北至
            n0_XianChangKanCha_XiZhi: '', // 西至
            n0_XianChangKanCha_NanZhi: '', // 南至
            n0_XianChangKanCha_DongZhi: '', // 东至
            n0_XianChangKanCha_WaiBuPeiTaoSheShiFenXi: '', // 外部配套设施分析
            n0_XianChangKanCha_JiChuSheShi: '', // 基础设施
            n0_XianChangKanCha_JiChuSheShiS: [],
            n0_XianChangKanCha_QiTong: '', // 七通
            n0_XianChangKanCha_QiTaSheShi: '', // 其他设施
            n0_XianChangKanCha_XiuXianYuLeJianShenSheShi: '', // 休闲娱乐健身设施
            n0_XianChangKanCha_ZhongXiaoXue: '', // 中小学
            n0_XianChangKanCha_YouErYuan: '', // 幼儿园
            n0_XianChangKanCha_YiYuan: '', // 医院
            n0_XianChangKanCha_ShangChang: '', // 商场
            n0_XianChangKanCha_ChaoShi: '', // 超市
            n0_XianChangKanCha_YinXing: '', // 银行
            n0_XianChangKanCha_HuanJingZhuangKuangFenXi: '', // 环境状况分析
            n0_XianChangKanCha_JingGuan: '', // 景观
            n0_XianChangKanCha_RenWenHuanJing: '', // 人文环境
            n0_XianChangKanCha_ZiRanHuanJing: '', // 自然环境
            n0_XianChangKanCha_JiaoTongZhuangKuangFenXi: '', // 交通状况分析
            n0_XianChangKanCha_TingCheFangBianChengDu: '', // 停车方便程度
            n0_XianChangKanCha_JiaoTongGuanZhiQingKuang: '', // 交通管制情况
            n0_XianChangKanCha_GuiDaoJiaoTongXianLu: '', // 轨道交通线路
            n0_XianChangKanCha_GuiDaoJiaoTongZhanDian: '', // 轨道交通站点
            n0_XianChangKanCha_GongGongJiaoTongXianLu: '', // 公共交通线路
            n0_XianChangKanCha_GongGongJiaoTongZhanDian: '', // 公共交通站点
            n0_XianChangKanCha_DaoLuLeiXing: '', // 道路类型
            n0_XianChangKanCha_DaoLuLeiXing: [], // 道路类型
            n0_XianChangKanCha_QuYuZhuYaoDaoLu: '', // 区域主要道路
            n0_XianChangKanCha_WeiZhiZhuangKuangFenXi: '', // 位置状况分析
            n0_XianChangKanCha_WeiZhiZhuangKuangFenXiS: [], // 位置状况分析
            n0_XianChangKanCha_YangTaiChaoXiang: '', // 阳台朝向
            n0_XianChangKanCha_YangTaiChaoXiangS: '', // 阳台朝向
            n0_XianChangKanCha_KeTingChaoXiang: '', // 客厅朝向
            n0_XianChangKanCha_KeTingChaoXiangS: '', // 客厅朝向
            n0_XianChangKanCha_CiWoChaoXiang: '', // 次卧朝向
            n0_XianChangKanCha_CiWoChaoXiangS: '', // 次卧朝向
            n0_XianChangKanCha_ZhuWoChaoXiang: '', // 主卧朝向
            n0_XianChangKanCha_ZhuWoChaoXiangS: '', // 主卧朝向
            n0_XianChangKanCha_ChaoXiang: '', // 朝向
            n0_XianChangKanCha_ChaoXiangS: '', // 朝向
            n0_XianChangKanCha_SuoZaiCeng: '', // 所在层
            n0_XianChangKanCha_LinJieZhuangKuang: '', // 临街状况
            n0_XianChangKanCha_LinJieZhuangKuangS: '', // 临街状况
            n0_XianChangKanCha_FangWeiFangXiangHeWeiZhi: '', // 方位方向和位置
            n0_XianChangKanCha_FangWeiHuanXian: '', // 方位环线
            n0_XianChangKanCha_ShiDiKanChaQi: '', // 实地勘查期
            n0_XianChangKanCha_YanFangJieShuShiJian: '', // 验房结束时间
            n0_XianChangKanCha_YanFangKaiShiShiJian: '' // 验房开始时间
      }

      // 权益信息
      var QuanYiZhuangKuangData = {
            n0_QuanYiZhuangKuang_GongYouQuanZhengLeiXing: '', // 临时存放  建筑物权益—共有权证  类型
            n0_QuanYiZhuangKuang_GongYouQuanZhengLeiXingS: [], // 临时存放  建筑物权益—共有权证  类型
            n0_QuanYiZhuangKuang_RongJiLv: 0.0, // 容积率
            n0_QuanYiZhuangKuang_JianZhuWuShengYuJingJiShouMing: 0, // 建筑物剩余经济寿命
            n0_QuanYiZhuangKuang_ShengYuTuDiNianXian: '', // 剩余土地年限
            n0_QuanYiZhuangKuang_FaDingZuiGaoTuDiShiYongNianXian: '', // 法定最高土地使用年限
            n0_QuanYiZhuangKuang_FaDingZuiGaoShiYongNianXianDeTuDiYongTu: '', // 法定最高使用年限的土地用途
            n0_QuanYiZhuangKuang_FaDingZuiGaoShiYongNianXianDeTuDiYongTuS: [], // 法定最高使用年限的土地用途
            n0_QuanYiZhuangKuang_DiYaSheDingRiQi: '', // 抵押设定日期
            n0_QuanYiZhuangKuang_QuanLiJiaZhi: 0, // 权利价值
            n0_QuanYiZhuangKuang_DiYaQuanRen: '', // 抵押权人
            n0_QuanYiZhuangKuang_ShiFuCunZaiDiYaQuan: '', // 是否存在抵押权
            n0_QuanYiZhuangKuang_ShiFuCunZaiDiYaQuanS: [], // 是否存在抵押权
            n0_QuanYiZhuangKuang_SuoGongQuanRenSuoZhanFenE5: '', // 所有权人5所占份额
            n0_QuanYiZhuangKuang_SuoGongQuanRen5: '', // 所有权人5
            n0_QuanYiZhuangKuang_FangWuSuoGongQuanZhengHao5: '', // 房屋所有权证号5
            n0_QuanYiZhuangKuang_SuoGongQuanRenSuoZhanFenE4: '', // 所有权人4所占份额
            n0_QuanYiZhuangKuang_SuoGongQuanRen4: '', // 所有权人4
            n0_QuanYiZhuangKuang_FangWuSuoGongQuanZhengHao4: '', // 房屋所有权证号4
            n0_QuanYiZhuangKuang_SuoGongQuanRenSuoZhanFenE3: '', // 所有权人3所占份额
            n0_QuanYiZhuangKuang_SuoGongQuanRen3: '', // 所有权人3
            n0_QuanYiZhuangKuang_FangWuSuoGongQuanZhengHao3: '', // 房屋所有权证号3
            n0_QuanYiZhuangKuang_SuoGongQuanRenSuoZhanFenE2: '', // 所有权人2所占份额
            n0_QuanYiZhuangKuang_SuoGongQuanRen2: '', // 所有权人2
            n0_QuanYiZhuangKuang_FangWuSuoGongQuanZhengHao2: '', // 房屋所有权证号2
            n0_QuanYiZhuangKuang_SuoGongQuanRenSuoZhanFenE1: '', // 所有权人1所占份额
            n0_QuanYiZhuangKuang_SuoGongQuanRen1: '', // 所有权人1
            n0_QuanYiZhuangKuang_FangWuSuoGongQuanZhengHao1: '', // 房屋所有权证号1
            n0_QuanYiZhuangKuang_WuTuDiZhengYuanYin: '', // 无土地证原因
            n0_QuanYiZhuangKuang_WuTuDiZhengYuanYinS: [], // 无土地证原因
            n0_QuanYiZhuangKuang_QiTaTeShuQingKuang: '', // 其他特殊情况
            n0_QuanYiZhuangKuang_TuDiShiYongGuanZhi: '', // 土地使用管制
            n0_QuanYiZhuangKuang_TuDiShiYongGuanZhiS: [], // 土地使用管制
            n0_QuanYiZhuangKuang_TuDiShiYongQuanMianJi: 0.0, // 土地使用权面积
            n0_QuanYiZhuangKuang_TuDiSuoYouQuanRen: '', // 土地所有权人
            n0_QuanYiZhuangKuang_TuDiSuoYouQuanRenS: [], // 土地所有权人
            n0_QuanYiZhuangKuang_ZhongZhiRiQi: '', // 终止日期
            n0_QuanYiZhuangKuang_TuDiYongTu: '', // 土地用途
            n0_QuanYiZhuangKuang_TuDiYongTuS: [], // 土地用途
            n0_QuanYiZhuangKuang_FenTanTuDiShiYongQuanMianJi: 0.0, // 分摊土地使用权面积
            n0_QuanYiZhuangKuang_DiHao: '', // 地号
            n0_QuanYiZhuangKuang_TuHao: '', // 图号
            n0_QuanYiZhuangKuang_TuDiShiYongQuanLeiXing: '', // 土地使用权类型
            n0_QuanYiZhuangKuang_TuDiShiYongQuanLeiXingS: [], // 土地使用权类型
            n0_QuanYiZhuangKuang_FaZhengRiQi: '', // 发证日期
            n0_QuanYiZhuangKuang_TuDiShiYongQuanRen: '', // 土地使用权人
            n0_QuanYiZhuangKuang_TuDiZuoLuo: '', // 土地坐落
            n0_QuanYiZhuangKuang_GuoJiaTuDiShiYongZhengHao: '', // 国家土地使用证号
            n0_QuanYiZhuangKuang_MianJiXiangQing: '', // 面积详情
            n0_QuanYiZhuangKuang_JianZhuMianJi: 0.0, // 建筑面积
            n0_QuanYiZhuangKuang_JianZhuJieGou: '', // 建筑结构
            n0_QuanYiZhuangKuang_JianZhuJieGouS: [], // 建筑结构
            n0_QuanYiZhuangKuang_ZongLouCeng: 0, // 总楼层
            n0_QuanYiZhuangKuang_SuoZaiLouCeng: 0, // 所在楼层
            n0_QuanYiZhuangKuang_DengJiRiQi: '', // 登记日期
            n0_QuanYiZhuangKuang_JianChengNianDai: '', // 建成年代
            n0_QuanYiZhuangKuang_JianChengNianDaiLaiYuan: '', // 建成年代来源
            n0_QuanYiZhuangKuang_JianChengNianDaiLaiYuanS: [], // 建成年代来源
            n0_QuanYiZhuangKuang_SheDingYongTu: '', // 设定用途
            n0_QuanYiZhuangKuang_SheDingYongTuS: [], // 设定用途
            n0_QuanYiZhuangKuang_DengJiYongTu: '', // 登记用途
            n0_QuanYiZhuangKuang_DengJiYongTuS: [], // 登记用途
            n0_QuanYiZhuangKuang_ChanBie: '', // 产别
            n0_QuanYiZhuangKuang_ChanBieS: [], // 产别
            n0_QuanYiZhuangKuang_ChanQuanXingZhi: '', // 产权性质
            n0_QuanYiZhuangKuang_ChanQuanXingZhiS: '', // 产权性质
            n0_QuanYiZhuangKuang_SuoYouQuanRenXingZhi: '', // 所有权人性质
            n0_QuanYiZhuangKuang_FangWuSuoYouQuanRen: '', // 房屋所有权人
            n0_QuanYiZhuangKuang_FangWuSuoYouQuanZhengZhengHao: '', // 房屋所有权证证号
            n0_QuanYiZhuangKuang_FangWuSuoYouQuanZhengLeiXing: '', // 房屋所有权证类型
            n0_QuanYiZhuangKuang_GuJiaXiangMuMingChen: '', // 估价项目名称
            n0_QuanYiZhuangKuang_HuHao: 0, // 户号
            n0_QuanYiZhuangKuang_DanYuanHao: '', // 单元号
            n0_QuanYiZhuangKuang_LouDongHao: '', // 楼栋号
            n0_QuanYiZhuangKuang_XiaoQuDiZhi: '', // 小区地址
            n0_QuanYiZhuangKuang_XiangMuQuXian: '', // 项目区县
            n0_QuanYiZhuangKuang_XiangMuSuoZaiShi: '', // 项目所在市
            n0_QuanYiZhuangKuang_XiangMuSuoZaiSheng: '', // 项目所在省
      }

      // 基础信息
      var JiChuXinXiData = {
            n0_JiChuXinXi_FangDiChanPingGuJiGou: '', // 房地产评估机构
            n0_JiChuXinXi_GuJiaXiangMuMingChen: '', // 估价项目名称
            n0_JiChuXinXi_LianXiFangShi: '', // 联系方式
            n0_JiChuXinXi_BaoDanJiGou: '', // 报单机构
            n0_JiChuXinXi_BaoDanRen: '', // 报单人
            n0_JiChuXinXi_JinJiZhuangKuang: '', //紧急状况
            n0_JiChuXinXi_JinJiZhuangKuangS: [], //紧急状况
            n0_JiChuXinXi_WeiTuoFangLeiXing: '企业', //委托方类型
            n0_JiChuXinXi_WeiTuoFangLeiXingS: ['企业','个人'], //委托方类型
            n0_JiChuXinXi_ZhuCeFangDiChanGuJiaShi3: '', // 注册房地产估价师3
            n0_JiChuXinXi_ZhuCeFangDiChanGuJiaShi2: '', // 注册房地产估价师2
            n0_JiChuXinXi_ZhuCeFangDiChanGuJiaShi1: '', // 注册房地产估价师1
            n0_JiChuXinXi_GuJiaShiZhuCeHao1: 'xxx', // 估价师注册号1
            n0_JiChuXinXi_GuJiaShiXingMing1: '某某某', // 估价师姓名1
            n0_JiChuXinXi_GuJiaShiZhuCeHao2: 'xxx', // 估价师注册号2
            n0_JiChuXinXi_GuJiaShiXingMing2: '某某某', // 估价师姓名2
            n0_JiChuXinXi_GuJiaShiZhuCeHao3: 'xxx', // 估价师注册号3
            n0_JiChuXinXi_GuJiaShiXingMing3: '某某某', // 估价师姓名3
            n0_JiChuXinXi_BaoGaoZhuanXieRenYuan: '', // 报告撰写人员
            n0_JiChuXinXi_XianChangKanChaRenYuan1: '', // 现场勘查人员1
            n0_JiChuXinXi_ZhongTaiXingMing: '', // 中台姓名
            n0_JiChuXinXi_BaoGaoYouXiaoQi: '', // 报告有效期
            n0_JiChuXinXi_BaoGaoFenShu: 0, // 报告份数
            n0_JiChuXinXi_BaoGaoZhongZhiRiQi: '', // 报告终止日期
            n0_JiChuXinXi_GuJiaQiShiRiQi: '', // 估价起始日期
            n0_JiChuXinXi_JiaZhiShiDian: '', // 价值时点
            n0_JiChuXinXi_BaoGaoZhongXianShiBaoGaoShiYongFang: '', // 报告中显示报告使用方
            n0_JiChuXinXi_ShiFuWeiZhongXiaoQiYe: '', // 是否为中小企业
            n0_JiChuXinXi_ZhiXingFenXing: '', // 支行分行
            n0_JiChuXinXi_BaoGaoShiYongFang: '', // 报告使用方
            n0_JiChuXinXi_BaoGaoShiYongFangS: [], // 报告使用方
            n0_JiChuXinXi_BaoGaoNianFen: '', // 报告年份
            n0_JiChuXinXi_JiaoYiBianHao: '', // 交易编号
            n0_JiChuXinXi_BaoGaoLiuShuiHao: '', // 报告流水号
            n0_JiChuXinXi_BaoGaoBianHao: '', // 报告编号
            n0_JiChuXinXi_GuJiaMuDeXiangXiMiaoShu: '', // 估价目的详细描述
            n0_JiChuXinXi_ShiFuXuYaoXianChangKanCha: '', // 是否需要现场勘查
            n0_JiChuXinXi_GuJiaMuDe: '', // 估价目的
            n0_JiChuXinXi_GuJiaMuDeS: [], // 估价目的
            n0_JiChuXinXi_BaoGaoLeiXing: '', // 报告类型
            n0_JiChuXinXi_wDiZhi1: '', // w地址1
            n0_JiChuXinXi_wZhengJianHao1: '', // w证件号1
            n0_JiChuXinXi_wZhengJianLeiXing1: '', // w证件类型1
            n0_JiChuXinXi_wXingMing1: '', // w姓名1
            n0_JiChuXinXi_wDiZhi2: '', // w地址2
            n0_JiChuXinXi_wZhengJianHao2: '', // w证件号2
            n0_JiChuXinXi_wZhengJianLeiXing2: '', // w证件类型2
            n0_JiChuXinXi_wXingMing2: '', // w姓名2
            n0_JiChuXinXi_wDiZhi3: '', // w地址3
            n0_JiChuXinXi_wZhengJianHao3: '', // w证件号3
            n0_JiChuXinXi_wZhengJianLeiXing3: '', // w证件类型3
            n0_JiChuXinXi_wXingMing3: '', // w姓名3
            n0_JiChuXinXi_wDiZhi4: '', // w地址4
            n0_JiChuXinXi_wZhengJianHao4: '', // w证件号4
            n0_JiChuXinXi_wZhengJianLeiXing4: '', // w证件类型4
            n0_JiChuXinXi_wXingMing4: '', // w姓名4
            n0_JiChuXinXi_wDiZhi5: '', // w地址5
            n0_JiChuXinXi_wZhengJianHao5: '', // w证件号5
            n0_JiChuXinXi_wZhengJianLeiXing5: '', // w证件类型5
            n0_JiChuXinXi_wXingMing5: '', // w姓名5
            n0_JiChuXinXi_wDiZhi6: '', // w地址6
            n0_JiChuXinXi_wZhengJianHao6: '', // w证件号6
            n0_JiChuXinXi_wZhengJianLeiXing6: '', //w证件类型6
            n0_JiChuXinXi_wXingMing6: '', // w姓名6
            n0_JiChuXinXi_wDiZhi7: '', // w地址7
            n0_JiChuXinXi_wZhengJianHao7: '', // w证件号7
            n0_JiChuXinXi_wZhengJianLeiXing7: '', // w证件类型7
            n0_JiChuXinXi_wXingMing7: '', // w姓名7
            n0_JiChuXinXi_wDiZhi8: '', // w地址8
            n0_JiChuXinXi_wZhengJianHao8: '', // w证件号8
            n0_JiChuXinXi_wZhengJianLeiXing8: '', // w证件类型8
            n0_JiChuXinXi_wXingMing8: '', // w姓名8
            n0_JiChuXinXi_wDiZhi9: '', // w地址9
            n0_JiChuXinXi_wZhengJianHao9: '', // w证件号9
            n0_JiChuXinXi_wZhengJianLeiXing9: '', // w证件类型9
            n0_JiChuXinXi_wXingMing9: '', // w姓名9
            n0_JiChuXinXi_wDiZhi10: '', // w地址10
            n0_JiChuXinXi_wZhengJianHao10: '', // w证件号10
            n0_JiChuXinXi_wZhengJianLeiXing10: '', // w证件类型10
            n0_JiChuXinXi_wXingMing10: '', // w姓名10
            n0_JiChuXinXi_jZhengJianHao1: '', // j证件号1
            n0_JiChuXinXi_jZhengJianLeiXing1: '', // j证件号1
            n0_JiChuXinXi_jZhengJianLeiXing1S: '', // j证件号1
            n0_JiChuXinXi_jXingMing1: '', // j姓名1
            n0_JiChuXinXi_jZhengJianHao2: '', // j证件号2
            n0_JiChuXinXi_jZhengJianLeiXing2: '', // j证件类型2
            n0_JiChuXinXi_jXingMing2: '', // j姓名2
            n0_JiChuXinXi_jZhengJianHao3: '', // j证件号3
            n0_JiChuXinXi_jZhengJianLeiXing3: '', // j证件类型3
            n0_JiChuXinXi_jXingMing3: '', // j姓名3
            n0_JiChuXinXi_jZhengJianHao4: '', // j姓名4
            n0_JiChuXinXi_jZhengJianLeiXing4: '', // j证件类型4
            n0_JiChuXinXi_jXingMing4: '', // j姓名4
            n0_JiChuXinXi_jZhengJianHao5: '', // j证件号5
            n0_JiChuXinXi_jZhengJianLeiXing5: '', // j证件类型5
            n0_JiChuXinXi_jXingMing5: '', // j姓名5
            n0_JiChuXinXi_jZhengJianHao6: '', // j证件号6
            n0_JiChuXinXi_jZhengJianLeiXing6: '', // j证件类型6
            n0_JiChuXinXi_jXingMing6: '', // j姓名6
            n0_JiChuXinXi_jZhengJianHao7: '', // j证件号7
            n0_JiChuXinXi_jZhengJianLeiXing7: '', // j证件类型7
            n0_JiChuXinXi_jXingMing7: '', // j姓名7
            n0_JiChuXinXi_jZhengJianHao8: '', // j证件号8
            n0_JiChuXinXi_jZhengJianLeiXing8: '', // j证件类型8
            n0_JiChuXinXi_jXingMing8: '', // j姓名8
            n0_JiChuXinXi_jZhengJianHao9: '', // j证件号9
            n0_JiChuXinXi_jZhengJianLeiXing9: '', // j证件类型9
            n0_JiChuXinXi_jXingMing9: '', // j姓名9
            n0_JiChuXinXi_jZhengJianHao10: '', // j证件号10
            n0_JiChuXinXi_jZhengJianLeiXing10: '', // j证件类型10
            n0_JiChuXinXi_jXingMing10: '', // j姓名10
            n0_JiChuXinXi_DanWeiMingChen1: '', // 单位名称1
            n0_JiChuXinXi_FaDingDaiBiaoRen1: '', // 法定代表人1
            n0_JiChuXinXi_DanWeiDiZhi1: '', // 单位地址1
            n0_JiChuXinXi_DanWeiMingChen2: '', // 单位名称2
            n0_JiChuXinXi_FaDingDaiBiaoRen2: '', // 法定代表人2
            n0_JiChuXinXi_DanWeiDiZhi2: '', // 单位地址2
            n0_JiChuXinXi_DanWeiMingChen3: '', // 单位名称3
            n0_JiChuXinXi_FaDingDaiBiaoRen3: '', // 法定代表人3
            n0_JiChuXinXi_DanWeiDiZhi3: '', // 单位地址3
            n0_JiChuXinXi_DanWeiMingChen4: '', // 单位名称4
            n0_JiChuXinXi_FaDingDaiBiaoRen4: '', // 法定代表人4
            n0_JiChuXinXi_DanWeiDiZhi4: '', // 单位地址4
            n0_JiChuXinXi_DanWeiMingChen5: '', // 单位名称5
            n0_JiChuXinXi_FaDingDaiBiaoRen5: '', // 法定代表人5
            n0_JiChuXinXi_DanWeiDiZhi5: '', // 单位地址5
            n0_JiChuXinXi_jDanWeiMingChen1: '', // j单位名称1
            n0_JiChuXinXi_jDanWeiMingChen2: '', // j单位名称2
            n0_JiChuXinXi_jDanWeiMingChen3: '', // j单位名称3
            n0_JiChuXinXi_jDanWeiMingChen4: '', // j单位名称4
            n0_JiChuXinXi_jDanWeiMingChen5: '', // j单位名称5
      }

      var GuJiaShiShengMingData = {
            n0_GuJiaShiShengMing_Yi: '',
            n0_GuJiaShiShengMing_Er: '',
            n0_GuJiaShiShengMing_San: '',
            n0_GuJiaShiShengMing_Si: '',
            n0_GuJiaShiShengMing_Wu: '',
            n0_GuJiaShiShengMing_Liu: '',
            n0_GuJiaShiShengMing_Qi: '',
            n0_GuJiaShiShengMing_Ba: '',
            n0_GuJiaShiShengMing_Jiu: '',
            n0_GuJiaShiShengMing_Shi: '',
            n0_GuJiaShiShengMing_ShiYi: '',
            n0_GuJiaShiShengMing_ShiEr: '',
            n0_GuJiaShiShengMing_ShiSan: '',
            n0_GuJiaShiShengMing_ShiSi: '',
            n0_GuJiaShiShengMing_ShiWu: '',
            n0_GuJiaShiShengMing_ShiLiu: '',
            n0_GuJiaShiShengMing_ShiQi: '',
            n0_GuJiaShiShengMing_ShiBa: '',
            n0_GuJiaShiShengMing_ShiJiu: '',
            n0_GuJiaShiShengMing_ErShi: ''
      }

      var GuJiaShiJiaSheData = {
            n0_GuJiaShiJiaShe_Yi: '',
            n0_GuJiaShiJiaShe_Er: '',
            n0_GuJiaShiJiaShe_San: '',
            n0_GuJiaShiJiaShe_Si: '',
            n0_GuJiaShiJiaShe_Wu: '',
            n0_GuJiaShiJiaShe_Liu: '',
            n0_GuJiaShiJiaShe_Qi: '',
            n0_GuJiaShiJiaShe_Ba: '',
            n0_GuJiaShiJiaShe_Jiu: '',
            n0_GuJiaShiJiaShe_Shi: '',
            n0_GuJiaShiJiaShe_ShiYi: '',
            n0_GuJiaShiJiaShe_ShiEr: '',
            n0_GuJiaShiJiaShe_ShiSan: '',
            n0_GuJiaShiJiaShe_ShiSi: '',
            n0_GuJiaShiJiaShe_ShiWu: '',
            n0_GuJiaShiJiaShe_ShiLiu: '',
            n0_GuJiaShiJiaShe_ShiQi: '',
            n0_GuJiaShiJiaShe_ShiBa: '',
            n0_GuJiaShiJiaShe_ShiJiu: '',
            n0_GuJiaShiJiaShe_ErShi: ''
      }

      var XianZhiTiaoJianData = {
            n0_XianZhiTiaoJian_Yi: '',
            n0_XianZhiTiaoJian_Er: '',
            n0_XianZhiTiaoJian_San: '',
            n0_XianZhiTiaoJian_Si: '',
            n0_XianZhiTiaoJian_Wu: '',
            n0_XianZhiTiaoJian_Liu: '',
            n0_XianZhiTiaoJian_Qi: '',
            n0_XianZhiTiaoJian_Ba: '',
            n0_XianZhiTiaoJian_Jiu: '',
            n0_XianZhiTiaoJian_Shi: '',
            n0_XianZhiTiaoJian_ShiYi: '',
            n0_XianZhiTiaoJian_ShiEr: '',
            n0_XianZhiTiaoJian_ShiSan: '',
            n0_XianZhiTiaoJian_ShiSi: '',
            n0_XianZhiTiaoJian_ShiWu: '',
            n0_XianZhiTiaoJian_ShiLiu: '',
            n0_XianZhiTiaoJian_ShiQi: '',
            n0_XianZhiTiaoJian_ShiBa: '',
            n0_XianZhiTiaoJian_ShiJiu: '',
            n0_XianZhiTiaoJian_ErShi: ''
      }

      var QiTaShuoMingShiXiangData = {
            n0_QiTaShuoMingShiXiang_Yi: '',
            n0_QiTaShuoMingShiXiang_Er: '',
            n0_QiTaShuoMingShiXiang_San: '',
            n0_QiTaShuoMingShiXiang_Si: '',
            n0_QiTaShuoMingShiXiang_Wu: '',
            n0_QiTaShuoMingShiXiang_Liu: '',
            n0_QiTaShuoMingShiXiang_Qi: '',
            n0_QiTaShuoMingShiXiang_Ba: '',
            n0_QiTaShuoMingShiXiang_Jiu: '',
            n0_QiTaShuoMingShiXiang_Shi: '',
            n0_QiTaShuoMingShiXiang_ShiYi: '',
            n0_QiTaShuoMingShiXiang_ShiEr: '',
            n0_QiTaShuoMingShiXiang_ShiSan: '',
            n0_QiTaShuoMingShiXiang_ShiSi: '',
            n0_QiTaShuoMingShiXiang_ShiWu: '',
            n0_QiTaShuoMingShiXiang_ShiLiu: '',
            n0_QiTaShuoMingShiXiang_ShiQi: '',
            n0_QiTaShuoMingShiXiang_ShiBa: '',
            n0_QiTaShuoMingShiXiang_ShiJiu: '',
            n0_QiTaShuoMingShiXiang_ErShi: ''
      }

      return {
            GuJiaDuiXiangData: GuJiaDuiXiangData, // 估价对象
            ImportCaseData: ImportCaseData, // 导入案例弹窗数据
            KeBiShiLi1Data: KeBiShiLi1Data, // 可比实例1
            KeBiShiLi2Data: KeBiShiLi2Data, // 可比实例2
            KeBiShiLi3Data: KeBiShiLi3Data, // 可比实例3
            ShiChangJiaGeQueDingData: ShiChangJiaGeQueDingData, // 市场价格确定
            DiYaJiaGeQueDingData: DiYaJiaGeQueDingData, // 抵押价格确定
            FangFaLiYouData: FangFaLiYouData, // 方法理由
            ShouYiFaData: ShouYiFaData, // 收益法
            ChengBenFaData: ChengBenFaData, // 成本法
            XianChangKanChaData: XianChangKanChaData, // 现场勘查
            QuanYiZhuangKuangData: QuanYiZhuangKuangData, // 权益状况
            JiChuXinXiData: JiChuXinXiData, // 基础信息
            GuJiaShiShengMingData: GuJiaShiShengMingData, // 估价师声明
            GuJiaShiJiaSheData: GuJiaShiJiaSheData, // 估价师假设
            XianZhiTiaoJianData: XianZhiTiaoJianData, // 限制条件
            QiTaShuoMingShiXiangData: QiTaShuoMingShiXiangData // 其他说明事项
      }
});