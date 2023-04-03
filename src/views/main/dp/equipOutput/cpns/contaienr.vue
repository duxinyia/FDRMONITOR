<template>
  <div class="page-main-a">
    <!-- 使用轮播图来展示数据 -->
    <el-carousel
      style="height: 860px"
      indicator-position="none"
      :interval="15 * 1000"
      ref="carousel"
      arrow="never"
      @change="carouselChange"
    >
      <el-carousel-item class="item1-container">
        <div class="deviceItem">
          <dv-border-box-11 class="top-box" :title="`AA生產看板`">
            <div
              class="container"
              v-loading="loading('AA')"
              element-loading-text="加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="#111e40"
            >
              <div class="item" v-for="(i, index) in comLength('AA')" :key="index">
                <!-- 表格头部 -->
                <div class="header">
                  <div class="header-item" style="flex: 1.1">Device</div>
                  <div class="header-item" style="flex: 1.8">Machine</div>
                  <div class="header-item">Build</div>
                  <div class="header-item">Target</div>
                  <div class="header-item">OutPut</div>
                  <div class="header-item" style="flex: 1.6">HitRate</div>
                  <div class="header-item" style="flex: 1.6">1st Yield</div>
                </div>
                <div class="item-container">
                  <!-- 表格数据截断 -->
                  <div
                    v-for="(item, dindex) in resultvalue['AA']
                      ? resultvalue['AA'].slice(
                          i * 24 - 24,
                          i === 3 ? resultvalue['AA'].length : i * 24
                        )
                      : {}"
                    :key="dindex"
                    class="every-item"
                  >
                    <div class="show" style="flex: 1.1">{{ item.device }}</div>
                    <div
                      class="show"
                      :class="item.machineState ? 'lamp-container' : ''"
                      style="flex: 1.8"
                    >
                      <span class="lamp" :style="changeMachine(item.machineState)"></span>
                      <span class="text">{{ item.machine }}</span>
                    </div>
                    <div class="show">{{ item.buildNo }}</div>
                    <div class="show">{{ item.target }}</div>
                    <div class="show">{{ item.outPut }}</div>
                    <div class="show lamp-container" style="flex: 1.6">
                      <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                      <span class="text">{{ item.hitRate }}</span>
                    </div>
                    <div class="show lamp-container" style="flex: 1.6">
                      <span class="lamp" :style="changeYield('AA', item.firstYield)"></span>
                      <span class="text">{{ item.firstYield }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <div class="deviceItem">
          <dv-border-box-11 class="top-box" :title="`DA生產看板`">
            <div
              class="container"
              v-loading="loading('DA')"
              element-loading-text="加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="#111e40"
            >
              <!-- <div class="container"> -->
              <div class="item">
                <!-- 表格头部 -->
                <div class="header">
                  <div class="header-item">Device</div>
                  <div class="header-item" style="flex: 1.1">Machine</div>
                  <div class="header-item">Build</div>
                  <div class="header-item">Target</div>
                  <div class="header-item">OutPut</div>
                  <div class="header-item">HitRate</div>
                </div>
                <div class="item-container">
                  <!-- 表格数据截断 -->
                  <div v-for="(item, dindex) in resultvalue['DA']" :key="dindex" class="every-item">
                    <div class="show">{{ item.device }}</div>
                    <div
                      class="show"
                      :class="item.machineState ? 'lamp-container' : ''"
                      style="flex: 1.1"
                    >
                      <span class="lamp" :style="changeMachine(item.machineState)"></span>
                      <span class="text">{{ item.machine }}</span>
                    </div>
                    <div class="show">{{ item.buildNo }}</div>
                    <div class="show">{{ item.target }}</div>
                    <div class="show">{{ item.outPut }}</div>
                    <div class="show lamp-container">
                      <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                      <span class="text">{{ item.hitRate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
        <div class="deviceItem">
          <dv-border-box-11 class="top-box" :title="`LA生產看板`">
            <div
              class="container"
              v-loading="loading('LA')"
              element-loading-text="加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="#111e40"
            >
              <!-- <div class="container"> -->
              <div class="item">
                <!-- 表格头部 -->
                <div class="header">
                  <div class="header-item">Device</div>
                  <div class="header-item" style="flex: 1.1">Machine</div>
                  <div class="header-item">Build</div>
                  <div class="header-item">Target</div>
                  <div class="header-item">OutPut</div>
                  <div class="header-item">HitRate</div>
                </div>
                <div class="item-container">
                  <!-- 表格数据截断 -->
                  <div v-for="(item, dindex) in resultvalue['LA']" :key="dindex" class="every-item">
                    <div class="show">{{ item.device }}</div>
                    <div
                      class="show"
                      :class="item.machineState ? 'lamp-container' : ''"
                      style="flex: 1.1"
                    >
                      <span class="lamp" :style="changeMachine(item.machineState)"></span>
                      <span class="text">{{ item.machine }}</span>
                    </div>
                    <div class="show">{{ item.buildNo }}</div>
                    <div class="show">{{ item.target }}</div>
                    <div class="show">{{ item.outPut }}</div>
                    <div class="show lamp-container">
                      <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                      <span class="text">{{ item.hitRate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <div class="deviceItem">
          <dv-border-box-11 class="top-box" :title="`ALN生產看板`">
            <div
              class="container"
              v-loading="loading('ALN')"
              element-loading-text="加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="#111e40"
            >
              <!-- <div class="container"> -->
              <div class="item">
                <!-- 表格头部 -->
                <div class="header">
                  <div class="header-item" style="flex: 1.1">Device</div>
                  <div class="header-item" style="flex: 1.8">Machine</div>
                  <div class="header-item">Build</div>
                  <div class="header-item">Target</div>
                  <div class="header-item">OutPut</div>
                  <div class="header-item" style="flex: 1.6">HitRate</div>
                </div>
                <div class="item-container">
                  <!-- 表格数据截断 -->
                  <div
                    v-for="(item, dindex) in resultvalue['ALN']"
                    :key="dindex"
                    class="every-item"
                  >
                    <div class="show" style="flex: 1.1">{{ item.device }}</div>
                    <div
                      class="show"
                      :class="item.machineState ? 'lamp-container' : ''"
                      style="flex: 1.8"
                    >
                      <span class="lamp" :style="changeMachine(item.machineState)"></span>
                      <span class="text">{{ item.machine }}</span>
                    </div>
                    <div class="show">{{ item.buildNo }}</div>
                    <div class="show">{{ item.target }}</div>
                    <div class="show">{{ item.outPut }}</div>
                    <div class="show lamp-container" style="flex: 1.6">
                      <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                      <span class="text">{{ item.hitRate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
        <div class="deviceItem">
          <dv-border-box-11 class="top-box" :title="`NTC生產看板`">
            <div
              class="container"
              v-loading="loading('NTC')"
              element-loading-text="加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="#111e40"
            >
              <!-- <div class="container"> -->
              <div class="item">
                <!-- 表格头部 -->
                <div class="header">
                  <div class="header-item" style="flex: 1.1">Device</div>
                  <div class="header-item" style="flex: 1.8">Machine</div>
                  <div class="header-item">Build</div>
                  <div class="header-item">Target</div>
                  <div class="header-item">OutPut</div>
                  <div class="header-item" style="flex: 1.6">HitRate</div>
                </div>
                <div class="item-container">
                  <!-- 表格数据截断 -->
                  <div
                    v-for="(item, dindex) in resultvalue['NTC']"
                    :key="dindex"
                    class="every-item"
                  >
                    <div class="show" style="flex: 1.1">{{ item.device }}</div>
                    <div
                      class="show"
                      :class="item.machineState ? 'lamp-container' : ''"
                      style="flex: 1.8"
                    >
                      <span class="lamp" :style="changeMachine(item.machineState)"></span>
                      <span class="text">{{ item.machine }}</span>
                    </div>
                    <div class="show">{{ item.buildNo }}</div>
                    <div class="show">{{ item.target }}</div>
                    <div class="show">{{ item.outPut }}</div>
                    <div class="show lamp-container" style="flex: 1.6">
                      <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                      <span class="text">{{ item.hitRate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
        <div class="deviceItem">
          <dv-border-box-11 class="top-box" :title="`GA生產看板`">
            <div
              class="container"
              v-loading="loading('GA')"
              element-loading-text="加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="#111e40"
            >
              <!-- <div class="container"> -->
              <div class="item">
                <!-- 表格头部 -->
                <div class="header">
                  <div class="header-item" style="flex: 1.1">Device</div>
                  <div class="header-item" style="flex: 1.8">Machine</div>
                  <div class="header-item">Build</div>
                  <div class="header-item">Target</div>
                  <div class="header-item">OutPut</div>
                  <div class="header-item" style="flex: 1.6">HitRate</div>
                </div>
                <div class="item-container">
                  <!-- 表格数据截断 -->
                  <div v-for="(item, dindex) in resultvalue['GA']" :key="dindex" class="every-item">
                    <div class="show" style="flex: 1.1">{{ item.device }}</div>
                    <div
                      class="show"
                      :class="item.machineState ? 'lamp-container' : ''"
                      style="flex: 1.8"
                    >
                      <span class="lamp" :style="changeMachine(item.machineState)"></span>
                      <span class="text">{{ item.machine }}</span>
                    </div>
                    <div class="show">{{ item.buildNo }}</div>
                    <div class="show">{{ item.target }}</div>
                    <div class="show">{{ item.outPut }}</div>
                    <div class="show lamp-container" style="flex: 1.6">
                      <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                      <span class="text">{{ item.hitRate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <div class="deviceItem">
          <dv-border-box-11 class="top-box" :title="`TS生產看板`">
            <div
              class="container"
              v-loading="loading('TS')"
              element-loading-text="加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="#111e40"
            >
              <!-- <div class="container"> -->
              <div class="item" v-for="(i, index) in comLength('TS')" :key="index">
                <!-- 表格头部 -->
                <div class="header">
                  <div class="header-item" style="flex: 1.1">Device</div>
                  <div class="header-item" style="flex: 1.8">Machine</div>
                  <div class="header-item">Build</div>
                  <div class="header-item">Target</div>
                  <div class="header-item">OutPut</div>
                  <div class="header-item" style="flex: 1.6">HitRate</div>
                </div>
                <div class="item-container">
                  <!-- 表格数据截断 -->
                  <div
                    v-for="(item, dindex) in resultvalue['TS']
                      ? resultvalue['TS'].slice(
                          i * 24 - 24,
                          i === 3 ? resultvalue['TS'].length : i * 24
                        )
                      : {}"
                    :key="dindex"
                    class="every-item"
                  >
                    <div class="show" style="flex: 1.1">{{ item.device }}</div>
                    <div
                      class="show"
                      :class="item.machineState ? 'lamp-container' : ''"
                      style="flex: 1.8"
                    >
                      <span class="lamp" :style="changeMachine(item.machineState)"></span>
                      <span class="text">{{ item.machine }}</span>
                    </div>
                    <div class="show">{{ item.buildNo }}</div>
                    <div class="show">{{ item.target }}</div>
                    <div class="show">{{ item.outPut }}</div>
                    <div class="show lamp-container" style="flex: 1.6">
                      <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                      <span class="text">{{ item.hitRate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <div class="deviceItem">
          <dv-border-box-11 class="top-box" :title="`ACF生產看板`">
            <div
              class="container"
              v-loading="loading('ACF')"
              element-loading-text="加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="#111e40"
            >
              <!-- <div class="container"> -->
              <div class="item">
                <!-- 表格头部 -->
                <div class="header">
                  <div class="header-item" style="flex: 1.1">Device</div>
                  <div class="header-item" style="flex: 1.8">Machine</div>
                  <div class="header-item">Build</div>
                  <div class="header-item">Target</div>
                  <div class="header-item">OutPut</div>
                  <div class="header-item" style="flex: 1.6">HitRate</div>
                </div>
                <div class="item-container">
                  <!-- 表格数据截断 -->
                  <div
                    v-for="(item, dindex) in resultvalue['ACF']"
                    :key="dindex"
                    class="every-item"
                  >
                    <div class="show" style="flex: 1.1">{{ item.device }}</div>
                    <div
                      class="show"
                      :class="item.machineState ? 'lamp-container' : ''"
                      style="flex: 1.8"
                    >
                      <span class="lamp" :style="changeMachine(item.machineState)"></span>
                      <span class="text">{{ item.machine }}</span>
                    </div>
                    <div class="show">{{ item.buildNo }}</div>
                    <div class="show">{{ item.target }}</div>
                    <div class="show">{{ item.outPut }}</div>
                    <div class="show lamp-container" style="flex: 1.6">
                      <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                      <span class="text">{{ item.hitRate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
        <div class="deviceItem">
          <dv-border-box-11 class="top-box" :title="`LF生產看板`">
            <div
              class="container"
              v-loading="loading('LF')"
              element-loading-text="加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="#111e40"
            >
              <!-- <div class="container"> -->
              <div class="item">
                <!-- 表格头部 -->
                <div class="header">
                  <div class="header-item" style="flex: 1.1">Device</div>
                  <div class="header-item" style="flex: 1.8">Machine</div>
                  <div class="header-item">Build</div>
                  <div class="header-item">Target</div>
                  <div class="header-item">OutPut</div>
                  <div class="header-item" style="flex: 1.6">HitRate</div>
                </div>
                <div class="item-container">
                  <!-- 表格数据截断 -->
                  <div v-for="(item, dindex) in resultvalue['LF']" :key="dindex" class="every-item">
                    <div class="show" style="flex: 1.1">{{ item.device }}</div>
                    <div
                      class="show"
                      :class="item.machineState ? 'lamp-container' : ''"
                      style="flex: 1.8"
                    >
                      <span class="lamp" :style="changeMachine(item.machineState)"></span>
                      <span class="text">{{ item.machine }}</span>
                    </div>
                    <div class="show">{{ item.buildNo }}</div>
                    <div class="show">{{ item.target }}</div>
                    <div class="show">{{ item.outPut }}</div>
                    <div class="show lamp-container" style="flex: 1.6">
                      <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                      <span class="text">{{ item.hitRate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
        <div class="deviceItem">
          <dv-border-box-11 class="top-box" :title="`AVI生產看板`">
            <div
              class="container"
              v-loading="loading('AVI')"
              element-loading-text="加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="#111e40"
            >
              <!-- <div class="container"> -->
              <div class="item">
                <!-- 表格头部 -->
                <div class="header">
                  <div class="header-item" style="flex: 1.1">Device</div>
                  <div class="header-item" style="flex: 1.8">Machine</div>
                  <div class="header-item">Build</div>
                  <div class="header-item">Target</div>
                  <div class="header-item">OutPut</div>
                  <div class="header-item" style="flex: 1.6">HitRate</div>
                </div>
                <div class="item-container">
                  <!-- 表格数据截断 -->
                  <div
                    v-for="(item, dindex) in resultvalue['AVI']"
                    :key="dindex"
                    class="every-item"
                  >
                    <div class="show" style="flex: 1.1">{{ item.device }}</div>
                    <div
                      class="show"
                      :class="item.machineState ? 'lamp-container' : ''"
                      style="flex: 1.8"
                    >
                      <span class="lamp" :style="changeMachine(item.machineState)"></span>
                      <span class="text">{{ item.machine }}</span>
                    </div>
                    <div class="show">{{ item.buildNo }}</div>
                    <div class="show">{{ item.target }}</div>
                    <div class="show">{{ item.outPut }}</div>
                    <div class="show lamp-container" style="flex: 1.6">
                      <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                      <span class="text">{{ item.hitRate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <div class="deviceItem">
          <dv-border-box-11 class="top-box" :title="`SA生產看板`">
            <div
              class="container"
              v-loading="loading('SA')"
              element-loading-text="加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="#111e40"
            >
              <!-- <div class="container"> -->
              <div class="item" v-for="(i, index) in comLength('SA')" :key="index">
                <!-- 表格头部 -->
                <div class="header">
                  <div class="header-item" style="flex: 1.1">Device</div>
                  <div class="header-item" style="flex: 1.8">Machine</div>
                  <div class="header-item">Build</div>
                  <div class="header-item">Target</div>
                  <div class="header-item">OutPut</div>
                  <div class="header-item" style="flex: 1.6">HitRate</div>
                </div>
                <div class="item-container">
                  <!-- 表格数据截断 -->
                  <div
                    v-for="(item, dindex) in resultvalue['SA']
                      ? resultvalue['SA'].slice(
                          i * 24 - 24,
                          i === 3 ? resultvalue['SA'].length : i * 24
                        )
                      : {}"
                    :key="dindex"
                    class="every-item"
                  >
                    <div class="show" style="flex: 1.1">{{ item.device }}</div>
                    <div
                      class="show"
                      :class="item.machineState ? 'lamp-container' : ''"
                      style="flex: 1.8"
                    >
                      <span class="lamp" :style="changeMachine(item.machineState)"></span>
                      <span class="text">{{ item.machine }}</span>
                    </div>
                    <div class="show">{{ item.buildNo }}</div>
                    <div class="show">{{ item.target }}</div>
                    <div class="show">{{ item.outPut }}</div>
                    <div class="show lamp-container" style="flex: 1.6">
                      <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                      <span class="text">{{ item.hitRate }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <div class="deviceItem">
          <dv-border-box-11 class="top-box" :title="`RET生產看板`">
            <div
              class="container"
              v-loading="loading('RET')"
              element-loading-text="加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="#111e40"
            >
              <!-- <div class="container"> -->
              <div class="item" v-for="(i, index) in comLength('RET')" :key="index">
                <!-- 表格头部 -->
                <div class="header">
                  <div class="header-item" style="flex: 1.1">Device</div>
                  <div class="header-item" style="flex: 1.8">Machine</div>
                  <div class="header-item">Build</div>
                  <div class="header-item">Target</div>
                  <div class="header-item">OutPut</div>
                  <div class="header-item" style="flex: 1.6">HitRate</div>
                  <div class="header-item" style="flex: 1.6">1st Yield</div>
                </div>
                <div class="item-container">
                  <!-- 表格数据截断 -->
                  <div
                    v-for="(item, dindex) in resultvalue['RET']
                      ? resultvalue['RET'].slice(
                          i * 24 - 24,
                          i === 3 ? resultvalue['RET'].length : i * 24
                        )
                      : {}"
                    :key="dindex"
                    class="every-item"
                  >
                    <div class="show" style="flex: 1.1">{{ item.device }}</div>
                    <div
                      class="show"
                      :class="item.machineState ? 'lamp-container' : ''"
                      style="flex: 1.8"
                    >
                      <span class="lamp" :style="changeMachine(item.machineState)"></span>
                      <span class="text">{{ item.machine }}</span>
                    </div>
                    <div class="show">{{ item.buildNo }}</div>
                    <div class="show">{{ item.target }}</div>
                    <div class="show">{{ item.outPut }}</div>
                    <div class="show lamp-container" style="flex: 1.6">
                      <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                      <span class="text">{{ item.hitRate }}</span>
                    </div>
                    <div class="show lamp-container" style="flex: 1.6">
                      <span class="lamp" :style="changeYield('RET', item.firstYield)"></span>
                      <span class="text">{{ item.firstYield }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <div class="deviceItem">
          <dv-border-box-11 class="top-box" :title="`TET生產看板`">
            <div
              class="container"
              v-loading="loading('TET')"
              element-loading-text="加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="#111e40"
            >
              <!-- <div class="container"> -->
              <div class="item" v-for="(i, index) in comLength('TET')" :key="index">
                <!-- 表格头部 -->
                <div class="header">
                  <div class="header-item" style="flex: 1.1">Device</div>
                  <div class="header-item" style="flex: 1.8">Machine</div>
                  <div class="header-item">Build</div>
                  <div class="header-item">Target</div>
                  <div class="header-item">OutPut</div>
                  <div class="header-item" style="flex: 1.6">HitRate</div>
                  <div class="header-item" style="flex: 1.6">1st Yield</div>
                </div>
                <div class="item-container">
                  <!-- 表格数据截断 -->
                  <div
                    v-for="(item, dindex) in resultvalue['TET']
                      ? resultvalue['TET'].slice(
                          i * 24 - 24,
                          i === 3 ? resultvalue['TET'].length : i * 24
                        )
                      : {}"
                    :key="dindex"
                    class="every-item"
                  >
                    <div class="show" style="flex: 1.1">{{ item.device }}</div>
                    <div
                      class="show"
                      :class="item.machineState ? 'lamp-container' : ''"
                      style="flex: 1.8"
                    >
                      <span class="lamp" :style="changeMachine(item.machineState)"></span>
                      <span class="text">{{ item.machine }}</span>
                    </div>
                    <div class="show">{{ item.buildNo }}</div>
                    <div class="show">{{ item.target }}</div>
                    <div class="show">{{ item.outPut }}</div>
                    <div class="show lamp-container" style="flex: 1.6">
                      <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                      <span class="text">{{ item.hitRate }}</span>
                    </div>
                    <div class="show lamp-container" style="flex: 1.6">
                      <span class="lamp" :style="changeYield('TET', item.firstYield)"></span>
                      <span class="text">{{ item.firstYield }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
      </el-carousel-item>
      <el-carousel-item class="item1-container">
        <div class="deviceItem">
          <dv-border-box-11 class="top-box" :title="`FTC生產看板`">
            <div
              class="container"
              v-loading="loading('FTC')"
              element-loading-text="加载中..."
              element-loading-spinner="el-icon-loading"
              element-loading-background="#111e40"
            >
              <!-- <div class="container"> -->
              <div class="item" v-for="(i, index) in comLength('FTC')" :key="index">
                <!-- 表格头部 -->
                <div class="header">
                  <div class="header-item" style="flex: 1.1">Device</div>
                  <div class="header-item" style="flex: 1.8">Machine</div>
                  <div class="header-item">Build</div>
                  <div class="header-item">Target</div>
                  <div class="header-item">OutPut</div>
                  <div class="header-item" style="flex: 1.6">HitRate</div>
                  <div class="header-item" style="flex: 1.6">1st Yield</div>
                </div>
                <div class="item-container">
                  <!-- 表格数据截断 -->
                  <div
                    v-for="(item, dindex) in resultvalue['FTC']
                      ? resultvalue['FTC'].slice(
                          i * 24 - 24,
                          i === 3 ? resultvalue['FTC'].length : i * 24
                        )
                      : {}"
                    :key="dindex"
                    class="every-item"
                  >
                    <div class="show" style="flex: 1.1">{{ item.device }}</div>
                    <div
                      class="show"
                      :class="item.machineState ? 'lamp-container' : ''"
                      style="flex: 1.8"
                    >
                      <span class="lamp" :style="changeMachine(item.machineState)"></span>
                      <span class="text">{{ item.machine }}</span>
                    </div>
                    <div class="show">{{ item.buildNo }}</div>
                    <div class="show">{{ item.target }}</div>
                    <div class="show">{{ item.outPut }}</div>
                    <div class="show lamp-container" style="flex: 1.6">
                      <span class="lamp" :style="changeStyle(item.hitRate)"></span>
                      <span class="text">{{ item.hitRate }}</span>
                    </div>
                    <div class="show lamp-container" style="flex: 1.6">
                      <span class="lamp" :style="changeYield('FTC', item.firstYield)"></span>
                      <span class="text">{{ item.firstYield }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dv-border-box-11>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!-- 自定义两个切换按钮 -->
    <div class="btns">
      <span class="left-icon-container" @click="prev">
        <i class="iconfont icon-shangyiye icon2"></i>
        <i class="iconfont icon-shangyiye icon1"></i>
        <i class="iconfont icon-shangyiye icon"></i>
      </span>
      <span @click="next">
        <i class="iconfont icon-xiayiye icon"></i>
        <i class="iconfont icon-xiayiye icon1"></i>
        <i class="iconfont icon-xiayiye icon2"></i>
      </span>
    </div>
  </div>
</template>

<script>
// 引入tooltop公共组件
import TextOverTooltip from "@/components/text-over-tooltip/TextOverTooltip.vue"
export default {
  name: "contaienr",
  components: { TextOverTooltip },
  props: {
    // 所有的数据
    resultvalue: {
      type: Object,
      default: () => ({})
    },
    // 当前的
    cIndex: {
      type: String,
      default: "AA"
    }
  },

  data() {
    return {
      // 当前的列数
      columns: 3,
      // 状态颜色
      colors1: ["rgba(255, 0, 102, 0.9)", "rgba(0, 255, 0, 0.9)", "rgba(255, 255, 0, 0.9)"],
      colors: [
        "radial-gradient(50% 50%, rgba(255, 0, 102, 0.5) 50%, rgba(255, 0, 102, 1) 100%)",
        "radial-gradient(50% 50%, rgba(0, 255, 0, 0.5) 50%, rgba(0, 255, 0, 1) 100%)",
        "radial-gradient(50% 50%, rgba(255, 255, 0, 0.5) 50%, rgba(255, 255, 0, 1) 100%)"
      ]
    }
  },
  mounted() {},
  computed: {},

  watch: {},
  methods: {
    // 数据没返回，有loading效果
    loading(index) {
      let count = 0
      for (let key in this.resultvalue[index]) {
        count++
      }
      return count === 0
    },
    // 计算列数，24行一列，最多三列
    comLength(index) {
      let count = 0
      for (let key in this.resultvalue[index]) {
        count++
      }
      if (count === 0) {
        return
      }
      let num = parseInt(count / 25) + 1 <= 3 ? parseInt(count / 25) + 1 : 3
      this.columns = num
      return num
    },
    // 机台状态
    changeMachine(state = 0) {
      if (state == "Run" || state == "RUN") {
        return { background: this.colors[1], color: this.colors1[1] }
      } else if (state == "Down" || state == "DOWN") {
        return { background: this.colors[0], color: this.colors1[0] }
      } else if (state == "Idle" || state == "IDLE") {
        return { background: this.colors[2], color: this.colors1[2] }
      } else {
        return { visibility: "hidden" }
      }
    },
    // hitRate状态
    changeStyle(hitRate) {
      let hr = Number.parseFloat(hitRate) || 0
      if (hr >= 100) {
        return { background: this.colors[1], color: this.colors1[1] }
      } else if (hr < 95) {
        return { background: this.colors[0], color: this.colors1[0] }
      } else {
        return { background: this.colors[2], color: this.colors1[2] }
      }
    },
    // firstYield状态
    changeYield(type, firstYield) {
      let num = Number.parseFloat(firstYield)
      if (type == "AA") {
        let yid = Number.parseFloat(num) || 0
        if (yid > 99) {
          return { background: this.colors[1], color: this.colors1[1] }
        } else if (yid < 97) {
          return { background: this.colors[0], color: this.colors1[0] }
        } else {
          return { background: this.colors[2], color: this.colors1[2] }
        }
      } else if (type == "RET") {
        let yid = Number.parseFloat(firstYield) || 0
        if (yid >= 97.5) {
          return { background: this.colors[1], color: this.colors1[1] }
        } else if (yid < 94.5) {
          return { background: this.colors[0], color: this.colors1[0] }
        } else {
          return { background: this.colors[2], color: this.colors1[2] }
        }
      } else if (type == "TET") {
        let yid = Number.parseFloat(firstYield) || 0
        if (yid >= 97.5) {
          return { background: this.colors[1], color: this.colors1[1] }
        } else if (yid < 95) {
          return { background: this.colors[0], color: this.colors1[0] }
        } else {
          return { background: this.colors[2], color: this.colors1[2] }
        }
      } else if (type == "FTC") {
        let yid = Number.parseFloat(firstYield) || 0
        if (yid >= 99.5) {
          return { background: this.colors[1], color: this.colors1[1] }
        } else if (yid < 95) {
          return { background: this.colors[0], color: this.colors1[0] }
        } else {
          return { background: this.colors[2], color: this.colors1[2] }
        }
      }
    },
    // 回调的参数为 索引
    carouselChange(index) {
      this.$emit("autoPlay", index)
    },
    // 上一页
    prev() {
      this.$refs.carousel.prev()
    },
    // 下一页
    next() {
      this.$refs.carousel.next()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-carousel__container {
  height: 100%;
}
::v-deep .border-box-content {
  padding: 60px 20px 20px 20px;
}
::v-deep .dv-border-box-11-title {
  font-size: 25px;
  font-weight: bold;
}
.page-main-a {
  min-width: 300%;
  padding-top: 5px;
}
.item1-container {
  display: flex;
  .deviceItem {
    flex: 1;
  }
}
.btns {
  span {
    z-index: 1000;
    margin-top: 10px;
    position: absolute;
    width: 120px;
    height: 50px;
    text-align: center;
    animation: twinkle 2s infinite;
    cursor: pointer;
    &:nth-child(1) {
      left: 15px;
      top: 46px;
    }
    &:nth-child(2) {
      right: 15px;
      top: 46px;
    }
    .icon {
      font-weight: bold;
      font-size: 20px;
      color: var(--aa-bottom-icon);
    }
    .icon1 {
      font-weight: bold;
      font-size: 20px;
      color: var(--aa-bottom-icon1);
    }
    .icon2 {
      font-weight: 800;
      font-size: 20px;
      color: var(--aa-bottom-icon2);
    }
  }
}
.container {
  margin-top: 51px;
  display: flex;
  height: calc(100% - 40px);
  .item {
    text-align: center;
    margin: 0 10px;
    flex: 1;
    .header {
      font-size: 18px;
      display: flex;
      border-top: 1px solid #1683af;
      border-bottom: 1px solid #1683af;
      border-left: 1px solid #1683af;
      line-height: 35px;
      background: #243d97;
      .header-item {
        // width: 5px;
        // white-space: nowrap;
        // overflow: hidden;
        // text-overflow: ellipsis;
        flex: 1;
        border-right: 1px solid #1683af;
      }
      .header-item:hover {
        cursor: pointer;
      }
    }
    .item-container {
      overflow: overlay;
      height: 744px;
      .every-item {
        display: flex;
        border-bottom: 1px solid #1683af;
        border-left: 1px solid #1683af;
        line-height: 30px;
        .show {
          // width: 5px;
          white-space: nowrap;
          flex: 1;
          border-right: 1px solid #1683af;
        }
        .lamp-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .lamp {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            margin-left: 8px;
            margin-right: 2px;
            animation: fade 2s infinite;
          }
          .text {
            padding-right: 8px;
          }
        }
      }
    }
  }
}

@keyframes fade {
  0% {
    box-shadow: inset 0 0 5px currentColor;
  }
  50% {
    box-shadow: inset 0 0 10px currentColor;
  }
  100% {
    box-shadow: inset 0 0 5px currentColor;
  }
}
</style>
