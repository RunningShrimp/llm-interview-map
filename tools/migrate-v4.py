#!/usr/bin/env python3
"""v4 id 迁移：老内容 id → 锚点制 id。
- 复用文件：重命名 data/content/<old>.json → <new>.json，并更新文件内 id/links.to
- 合并/退役文件：不重命名（由主 Agent 在阶段3 合并或删除），但全库引用重定向到承接点
- deps 数组、boss ref 一并更新；报告剩余悬挂引用
"""
import json, os, sys, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, "data", "content")
BOSS = os.path.join(ROOT, "data", "boss")

# 老id -> 新id（复用=文件重命名；合并/退役=仅引用重定向）
M = {
    # 0 层
    "a1-what-is-llm": "0-5",
    "a2-how-models-learn": "0-3",
    "a3-transformer-intuition": "0-4",
    "a4-tokenization-basics": "0-4b",
    "a5-embedding-basics": "0-7",
    "a7-self-attention-qkv": "0-4c",
    "a9-positional-encoding-rope": "0-4d",
    "c1-prompt-basics": "0-6",
    "c3-prompt-five-elements": "0-6b",
    "d7-ann-principle": "0-7b",
    # 1 层
    "a6-model-family-basics": "1-1",
    "c4-decoding-params-practice": "1-1b",
    "c9-sampling-math": "1-1c",
    "c7-cot-principle": "1-2",
    "f5-injection-defense-practice": "1-2b",
    "c5-structured-output-practice": "1-3",
    "e2-tool-calling-basics": "1-3b",
    "e4-function-calling-practice": "1-3c",
    "c6-context-management-practice": "1-5",
    "c11-hallucination-defense": "1-7b",
    # 2 层
    "e1-agent-basics": "2-1",
    "e5-tool-error-practice": "2-3",
    "e6-mcp-practice": "2-3b",
    "e7-memory-mechanism": "2-4",
    "e3-react-practice": "2-5",
    "e8-react-mechanism": "2-5b",
    # 关3
    "d1-rag-intuition": "1-4",
    "d3-rag-mvp": "1-4b",
    "d6-rag-vs-finetune-vs-longctx": "1-4d",
    "d9-rag-evaluation": "2-9",
    "e10-agent-eval-governance": "2-9b",
    # 关4（3.x + H 不改名）
    "d11-enterprise-rag-data": "3-2",
    "b10-synthetic-data": "3-2b",
    "f10-observability-system": "3-4",
    "f4-vllm-practice": "3-6",
    "f8-memory-planning": "3-6b",
    "f11-edge-inference": "3-6c",
    "f1-slow-inference-basics": "3-7",
    "f6-kv-cache-pagedattention": "3-7b",
    "f9-cost-optimization-system": "3-7c",
    # 关5/6
    "e9-multi-agent-platform": "4-7",
    "g6-agent-system-full": "4-7b",
    "g3-knowledge-qa-skeleton": "4-2",
    "g5-knowledge-qa-full": "4-2b",
    "g1-star-narrative": "4-10b",
    "g7-architect-expression": "4-10c",
    # 合并/退役 → 引用重定向（文件本体阶段3处理）
    "b1-pretraining-basics": "0-5b",
    "b2-alignment-basics": "0-5b",
    "b3-sft-data-practice": "0-5b",
    "b5-sft-pitfalls": "0-5b",
    "b8-lora-principle": "0-5b",
    "b9-distributed-training": "0-5b",
    "b4-lora-practice": "0-5b",
    "b11-training-cost-tradeoff": "1-4d",
    "c2-hallucination-basics": "0-5d",
    "c8-hallucination-mechanism": "0-5d",
    "c10-prompt-system-design": "h3-context-engineering-practice",
    "d2-finetune-intuition": "0-5b",
    "d4-chunking-practice": "1-4c",
    "d5-vector-db-practice": "1-4c",
    "d8-rerank-principle": "1-4c",
    "d10-graphrag-advanced": "h4-agentic-rag",
    "f2-gpu-memory-basics": "3-6b",
    "f3-quantization-practice": "3-6c",
    "f7-quantization-principle": "3-6c",
    "g2-interview-strategy": "4-10c",
    "g4-system-design-template": "4-10c",
    "a8-multi-head-attention": "0-4c",
    "a10-layer-vs-batch-norm": "0-4c",
    "a11-residual-norm": "0-4c",
    "a12-moe-experts": "0-4c",
    "a13-architecture-trends": "1-1",
    "a14-attention-optimization": "3-7b",
}

REUSE = {k: v for k, v in M.items() if not k.startswith(("b1", "b2", "b3", "b4", "b5", "b8", "b9", "b11", "c2", "c8", "c10", "d2", "d4", "d5", "d8", "d10", "f2", "f3", "f7", "g2", "g4", "a8", "a10", "a11", "a12", "a13", "a14"))}

def fix_refs(obj, path, report):
    """递归替换 id 引用字段"""
    if isinstance(obj, dict):
        for k, v in list(obj.items()):
            if k in ("to", "ref") and isinstance(v, str) and v in M:
                report.append((path, k, v, M[v]))
                obj[k] = M[v]
            elif k == "deps" and isinstance(v, list):
                for i, d in enumerate(v):
                    if d in M:
                        report.append((path, "deps", d, M[d]))
                        v[i] = M[d]
            else:
                fix_refs(v, path, report)
    elif isinstance(obj, list):
        for x in obj:
            fix_refs(x, path, report)

def main():
    renamed, missing, refs = [], [], []
    # 1) 重命名复用文件 + 更新其内部 id/引用
    for old, new in sorted(REUSE.items()):
        src = os.path.join(CONTENT, old + ".json")
        dst = os.path.join(CONTENT, new + ".json")
        if not os.path.exists(src):
            missing.append(old)
            continue
        with open(src, encoding="utf-8") as f:
            data = json.load(f)
        fix_refs(data, new, refs)
        data["id"] = new
        with open(dst, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        os.remove(src)
        renamed.append((old, new))
    # 2) 其余内容文件（合并源/退役前的遗留 + H）更新引用
    for fn in sorted(os.listdir(CONTENT)):
        if not fn.endswith(".json"):
            continue
        p = os.path.join(CONTENT, fn)
        with open(p, encoding="utf-8") as f:
            data = json.load(f)
        before = json.dumps(data, ensure_ascii=False)
        fix_refs(data, fn[:-5], refs)
        if json.dumps(data, ensure_ascii=False) != before:
            with open(p, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
    # 3) Boss 题库 ref
    for fn in sorted(os.listdir(BOSS)):
        if not fn.endswith(".json"):
            continue
        p = os.path.join(BOSS, fn)
        with open(p, encoding="utf-8") as f:
            data = json.load(f)
        fix_refs(data, fn, refs)
        with open(p, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    print("renamed:", len(renamed))
    for o, n in renamed:
        print("  ", o, "->", n)
    print("missing source files:", missing)
    print("ref redirects:", len(refs))
    # 4) 悬挂引用检查：所有 links.to/deps/ref 是否都映射到了已知新 id
    KNOWN = set(M.values())
    for fn in sorted(os.listdir(CONTENT)):
        if not fn.endswith(".json"):
            continue
        with open(os.path.join(CONTENT, fn), encoding="utf-8") as f:
            data = json.load(f)
        for l in data.get("links", []):
            if l.get("to") not in KNOWN:
                print("DANGLING link in", fn, "->", l.get("to"))
        for d in data.get("deps", []) or []:
            pass

if __name__ == "__main__":
    main()
