export default function listPlans(name) {
  const plans = [
    {
      id: 1,
      title: 'Basic',
      name: 'basic',
      description:
        'Você faz 1 aula por semana. Totalizando 4 aulas no mês. A cobrança será feita mensalmente',
      price: 98,
    },
    {
      id: 2,
      title: 'Vip',
      name: 'vip',
      description:
        'Você faz 2 aulas por semana. Totalizando 8 aulas no mês. A cobrança será feita mensalmente',
      price: 198,
    },
    {
      id: 3,
      title: 'Premium',
      name: 'premium',
      description:
        'Você faz 3 aulas por semana. Totalizando 12 aulas no mês. A cobrança será feita mensalmente',
      price: 248,
    },
  ];
  const plan = plans.filter((element) => element.name === name);
  return plan[0];
}
