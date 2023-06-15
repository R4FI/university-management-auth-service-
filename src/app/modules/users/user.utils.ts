import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};
// generate student id
export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0'); //00000
  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  //20 25
  if (academicSemester) {
    incrementedId = `${academicSemester.year.substring(2)}${
      academicSemester.code
    }${incrementedId}`;
  }

  return incrementedId;
};

// export const generateStudentId = async (
//   academicSemester: IAcademicSemester
// ): Promise<string> => {
//   const currentId =
//     (await findLastStudentId()) || (0).toString().padStart(5, '0');
//   let incrementedID = (parseInt(currentId) + 1).toString().padStart(5, '0');
//   incrementedID = `${academicSemester.year.substring(2)}${
//     academicSemester.code
//   }${incrementedID}`;
//   return incrementedID;
// };

export const findLasFacultytId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1
    })
    .lean();
  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLasFacultytId()) || (0).toString().padStart(5, '0');
  let incrementedID = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedID = `F-${incrementedID}`;
  return incrementedID;
};

export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1
    })
    .lean();
  return lastAdmin?.id;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementedID = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedID = `A-${incrementedID}`;
  return incrementedID;
};
