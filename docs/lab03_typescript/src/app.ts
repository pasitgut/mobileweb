import { Student } from "./models/Student.js";
import { StudentManager } from "./managers/StudentManager.js";
import { showList } from "./utils/showList.js";

const manager = new StudentManager();

function renderTable(
  elementId: string = "studentTableBody",
  data: Student[] | null = null,
): void {
  const tableBody = document.getElementById(elementId)!;
  tableBody.innerHTML = "";

  const students = data ? data : manager.getAllStudents();

  showList<Student>(students);

  students.forEach((s) => {
    tableBody.innerHTML += `
            <tr>
                <td>${s.id}</td>
                <td>${s.title_name}</td>
                <td>${s.first_name}</td>
                <td>${s.last_name}</td>
                <td>${s.email}</td>
                <td>${s.year}</td>
                <td>${s.major}</td>
            </tr>
        `;
  });
}

renderTable();

(document.getElementById("addBtn") as HTMLButtonElement).onclick = () => {
  const id = (document.getElementById("id") as HTMLInputElement).value;
  const title_name = (document.getElementById("title_name") as HTMLInputElement)
    .value;
  const first_name = (document.getElementById("first_name") as HTMLInputElement)
    .value;
  const last_name = (document.getElementById("last_name") as HTMLInputElement)
    .value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const year = Number(
    (document.getElementById("year") as HTMLInputElement).value,
  );
  const major = (document.getElementById("major") as HTMLInputElement).value;

  const student: Student = {
    id,
    title_name,
    first_name,
    last_name,
    email,
    year,
    major,
  };
  manager.addStudent(student);
  alert("บันทึกข้อมูลเรียบร้อย!");
  renderTable();
};

(document.getElementById("searchNameBtn") as HTMLButtonElement).onclick =
  () => {
    const keyword = (document.getElementById("searchName") as HTMLInputElement)
      .value;
    const results = manager.findStudentByName(keyword);
    renderTable("studentTableBody", results); // update ตารางด้วยผลลัพธ์
    alert(`ผลการค้นหา: ${results.length} คน`);
  };

(document.getElementById("searchMajorBtn") as HTMLButtonElement).onclick =
  () => {
    const keyword = (document.getElementById("searchMajor") as HTMLInputElement)
      .value;
    const results = manager.findStudentByMajor(keyword);
    renderTable("studentTableBody", results);
    alert(`พบในสาขา: ${results.length} คน`);
  };

(document.getElementById("searchEmailBtn") as HTMLButtonElement).onclick =
  () => {
    const keyword = (document.getElementById("searchEmail") as HTMLInputElement)
      .value;
    const result = manager.findStudentByEmail(keyword);
    if (result) {
      renderTable("studentTableBody", [result]); // ส่งไปเป็น Array เพราะ renderTable รับ array
      alert(`พบนักศึกษา: ${result.first_name}`);
    } else {
      alert("ไม่พบข้อมูล Email นี้");
      renderTable("studentTableBody", []);
    }
  };
