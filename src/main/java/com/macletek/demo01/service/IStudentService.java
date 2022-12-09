package com.macletek.demo01.service;

import java.util.List;

import com.macletek.demo01.bean.Student;

public interface IStudentService {

	public int addAndDelStudent(Student student , Integer id);

	public int addStudent(Student student);

	public int deleteStudent(Integer id);

	public int updateStudent(Student student);

	public Student getStudentById(Integer id);

	public List<Student> listAllStudents();

	public List<Student> getStudentByName(String name);

}
