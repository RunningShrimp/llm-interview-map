/* 判题引擎 — 纯函数实现，浏览器与 Node 单测均可加载 */
(function (g) {
  "use strict";

  function norm(s) {
    return String(s == null ? "" : s).toLowerCase().replace(/\s+/g, "");
  }

  g.Judge = {
    norm: norm,

    /** 关键词命中：任一关键词（去空白、忽略大小写）出现在作答文本中即命中 */
    hitAny: function (text, kws) {
      var t = norm(text);
      return (kws || []).some(function (k) {
        var n = norm(k);
        return n.length > 0 && t.indexOf(n) !== -1;
      });
    },

    /** 选择题判分：picked 为选项下标 */
    gradeChoice: function (ex, picked) {
      return {
        correct: picked === ex.answer,
        answerIndex: ex.answer
      };
    },

    /** 场景分析题判分：按 keyPoints 关键词逐点命中 */
    gradeScenario: function (ex, text) {
      var kps = (ex.keyPoints || []).map(function (k) {
        return { point: k.point, hit: this.hitAny(text, k.kw) };
      }, this);
      var score = kps.filter(function (k) { return k.hit; }).length;
      return { details: kps, score: score, total: kps.length };
    },

    /** 模块回顾测验整卷判分 */
    gradeQuiz: function (questions, picks) {
      var per = questions.map(function (q, i) {
        return { correct: picks[i] === q.answer, answer: q.answer };
      });
      return {
        per: per,
        score: per.filter(function (p) { return p.correct; }).length,
        total: questions.length
      };
    }
  };
})(typeof window !== "undefined" ? window : globalThis);
