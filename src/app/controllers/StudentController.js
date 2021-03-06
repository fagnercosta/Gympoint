import * as Yup from 'yup';
import Student from '../model/Student';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll();
    return res.json(students);
  }

  async store(req, res) {
    // Validaçáo dos dados
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .positive()
        .required(),

      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(500).json({ error: 'Validation Fails' });
    }

    // Verifica se já existe um studant cadastrado através da propriedade e-mail
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });
    // Verifica se o Students já está cadastrado
    if (studentExists) {
      return res.status(400).json({ error: 'Students aleready exists!' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async updtate(req, res) {
    // Validação
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .required()
        .email(),
      age: Yup.number().positive(),
      weight: Yup.number().positive(),
      height: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation Fails.',
      });
    }
    const { id, email } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found!' });
    }

    // Verifica se o e-mail informado e o mesmo do Studant
    if (student.email !== email) {
      const emailStudent = await Student.findOne({ where: email });

      if (emailStudent) {
        return res.status(400).json({ error: 'Student email is aleready!' });
      }
    }

    const { name, age, weight, height } = await student.update(req.body);

    return res.json({
      name,
      email,
      age,
      weight,
      height,
    });
  }
}

export default new StudentController();
