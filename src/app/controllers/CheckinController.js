import * as Yup from 'yup';
import { subDays, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../model/Checkin';
import Student from '../model/Student';

class CheckinController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation falis!' });
    }

    const { student_id } = req.body;
    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }
    // Obtem da data atual
    const today = Number(new Date());
    //
    const period = subDays(today, 7);
    const checkins = await Checkin.findAll({
      where: {
        student_id,
        created_at: {
          [Op.between]: [startOfDay(period), endOfDay(today)],
        },
      },
    });

    if (checkins.length === 5) {
      return res.status(401).json({
        error: `Max of ${checkins.length} checkins reached in  7 days`,
      });
    }

    const checkin = await Checkin.create({ student_id });

    return res.json(checkin);
  }
}

export default new CheckinController();
