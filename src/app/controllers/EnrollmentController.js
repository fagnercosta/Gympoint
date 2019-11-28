import * as Yup from 'yup';
import { isBefore, parseISO, addMonths } from 'date-fns';
import Enrollment from '../model/Enrollment';
import Student from '../model/Student';
import Plan from '../model/Plan';

class EnrollmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
      plan_id: Yup.date().required(),
      student_id: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    // obtem os paramentos do corpo da requisicao
    const { student_id, plan_id, start_date } = req.body;
    // verifica se o estudante esta cadastrado
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(400).json({ error: 'This student is not registered' });
    }
    // Verifica se o estudante já esta matriculado em algum plano
    const enrollmentExists = await Enrollment.findOne({
      where: { student_id },
    });
    if (enrollmentExists) {
      return res
        .status(400)
        .json({ error: 'The student already registration.' });
    }

    // Verifica se o plano informado existe
    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res
        .status(400)
        .json({ error: "This plan doesn't exist or has been removed" });
    }

    // Verifica se a data inicial e valida
    const initial_date = parseISO(start_date);
    if (isBefore(initial_date, new Date())) {
      return res.status(400).json({ error: 'This date is not allowed' });
    }

    // Defirnir data final da matricula
    const end_date = addMonths(initial_date, plan.duration);
    const price = plan.price * plan.duration;

    const enrollment = await Enrollment.create({
      start_date,
      student_id,
      plan_id,
      price,
      end_date,
    });
    return res.json(enrollment);
  }

  async index(req, res) {
    const enrollments = await Enrollment.findAll();
    return res.json(enrollments);
  }
}
export default new EnrollmentController();
