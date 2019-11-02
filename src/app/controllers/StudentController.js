import Student from '../model/Student';

class StudentController {
  async store(req, res) {
    // Verifica se já existe um estudante cadastro através da propriedade e-mail
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
}

export default new StudentController();
