import * as Yup from 'yup';
import Plan from '../model/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();
    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .required()
        .positive(),
      price: Yup.number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falidate fails' });
    }

    const planExists = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (planExists) {
      return res
        .status(400)
        .json({ error: 'Plan already exists with this title!' });
    }

    const { id, title } = await Plan.create(req.body);
    return res.json({
      id,
      title,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      price: Yup.number(),
      duration: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validate Fails!' });
    }

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not found!' });
    }

    plan.save();

    return res.json(plan);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res
        .status(400)
        .json({ error: 'No plan found with reported data!' });
    }
    plan.canceled_at = new Date();
    await plan.save();

    const { id, title, price, duration, canceled_at } = plan;
    return res.json({
      id,
      title,
      price,
      duration,
      canceled_at,
    });
  }
}

export default new PlanController();
