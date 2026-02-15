"use client";

import { useState } from "react";

type Job = {
  id: number;
  date: string;
  dead: string;
  category: string;
  memo: string;
  url: string;
  note: string;
  interview: string;
};

export default function Page() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Job | null>(null);

  // 新規行追加
  const addRow = () => {
    const newJob: Job = {
      id: Date.now(),
      date: "",
      dead: "",
      category: "",
      memo: "",
      url: "",
      note: "",
      interview: "",
    };

    setJobs([...jobs, newJob]);
    setEditingId(newJob.id);
    setEditData(newJob);
  };

  const startEdit = (job: Job) => {
    setEditingId(job.id);
    setEditData({ ...job });
  };

  const handleChange = (field: keyof Job, value: string) => {
    if (!editData) return;
    setEditData({ ...editData, [field]: value });
  };

  const saveEdit = () => {
    if (!editData) return;
    setJobs(jobs.map((j) => (j.id === editData.id ? editData : j)));
    setEditingId(null);
    setEditData(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>応募案件一覧</h1>

      <button onClick={addRow}>＋行追加</button>

      <table border={1} cellPadding={6} style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>応募日</th>
            <th>Dead</th>
            <th>分類</th>
            <th>内容</th>
            <th>URL</th>
            <th>備考</th>
            <th>面談</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => {
            const isEditing = editingId === job.id;

            return (
              <tr key={job.id}>
                <td>
                  {isEditing ? (
                    <input
                      value={editData?.date || ""}
                      onChange={(e) =>
                        handleChange("date", e.target.value)
                      }
                    />
                  ) : (
                    job.date
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      value={editData?.dead || ""}
                      onChange={(e) =>
                        handleChange("dead", e.target.value)
                      }
                    />
                  ) : (
                    job.dead
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      value={editData?.category || ""}
                      onChange={(e) =>
                        handleChange("category", e.target.value)
                      }
                    />
                  ) : (
                    job.category
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      value={editData?.memo || ""}
                      onChange={(e) =>
                        handleChange("memo", e.target.value)
                      }
                    />
                  ) : (
                    job.memo
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      value={editData?.url || ""}
                      onChange={(e) =>
                        handleChange("url", e.target.value)
                      }
                    />
                  ) : (
                    job.url
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      value={editData?.note || ""}
                      onChange={(e) =>
                        handleChange("note", e.target.value)
                      }
                    />
                  ) : (
                    job.note
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <input
                      value={editData?.interview || ""}
                      onChange={(e) =>
                        handleChange("interview", e.target.value)
                      }
                    />
                  ) : (
                    job.interview
                  )}
                </td>

                <td>
                  {isEditing ? (
                    <button onClick={saveEdit}>保存</button>
                  ) : (
                    <button onClick={() => startEdit(job)}>
                      編集
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
