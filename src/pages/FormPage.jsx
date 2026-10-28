import { useState } from 'react';

const initialFormData = {
  nome: '',
  email: '',
  telefone: '',
  racaPreferida: '',
  idade: '',
  experiencia: '',
  aceiteTermos: false,
};

const initialErrors = {
  nome: '',
  email: '',
  telefone: '',
  racaPreferida: '',
  idade: '',
  experiencia: '',
  aceiteTermos: '',
};

const validateField = (name, value, formData) => {
  switch (name) {
    case 'nome':
      if (!value.trim()) return 'Nome é obrigatório';
      if (value.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres';
      return '';
    case 'email':
      if (!value.trim()) return 'E-mail é obrigatório';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'E-mail inválido';
      return '';
    case 'telefone':
      if (!value.trim()) return 'Telefone é obrigatório';
      if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(value)) return 'Formato: (11) 99999-9999';
      return '';
    case 'racaPreferida':
      if (!value) return 'Selecione uma raça preferida';
      return '';
    case 'idade':
      if (!value) return 'Selecione sua faixa etária';
      return '';
    case 'experiencia':
      if (!value) return 'Selecione seu nível de experiência';
      return '';
    case 'aceiteTermos':
      if (!value) return 'Você deve aceitar os termos';
      return '';
    default:
      return '';
  }
};

export function FormPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, newValue, { ...formData, [name]: newValue }),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value, formData),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(newTouched);

    const newErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = validateField(key, formData[key], formData);
      return acc;
    }, {});
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== '');

    if (!hasErrors) {
      setSubmitSuccess(true);
      setSubmitted(true);
      console.log('Formulário enviado:', formData);

      setTimeout(() => {
        setSubmitSuccess(false);
        setSubmitted(false);
        setFormData(initialFormData);
        setErrors(initialErrors);
        setTouched({});
      }, 3000);
    }
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    e.target.value = formatted;
    handleChange({ target: { ...e.target, value: formatted } });
  };

  const racas = [
    'Siamês',
    'Persa',
    'Maine Coon',
    'Bengal',
    'Ragdoll',
    'British Shorthair',
    'Sphynx',
    'Scottish Fold',
    'Abissínio',
    'Outra',
  ];

  const idades = [
    'Até 18 anos',
    '19-25 anos',
    '26-35 anos',
    '36-50 anos',
    '50+ anos',
  ];

  const experiencias = [
    { value: 'iniciante', label: 'Iniciante - Nunca tive gato' },
    { value: 'intermediario', label: 'Intermediário - Já tive 1-2 gatos' },
    { value: 'avancado', label: 'Avançado - Tenho/tive 3+ gatos' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-black text-gray-800 mb-2">📝 Cadastro de Tutor</h1>
          <p className="text-gray-600">Preencha seus dados para receber novidades do CatLab</p>
        </header>

        {submitSuccess && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl animate-fade-in flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
            <div>
              <p className="font-semibold text-emerald-800">Cadastro realizado com sucesso!</p>
              <p className="text-sm text-emerald-600">Obrigado por se cadastrar, {formData.nome.split(' ')[0]}! 🐱</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6" noValidate>
          <div className="space-y-5">
            <div>
              <label htmlFor="nome" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                  touched.nome && errors.nome ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="João da Silva"
              />
              {touched.nome && errors.nome && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">⚠ {errors.nome}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                  touched.email && errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="joao@email.com"
              />
              {touched.email && errors.email && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">⚠ {errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Telefone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handlePhoneChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                  touched.telefone && errors.telefone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="(11) 99999-9999"
                maxLength={15}
              />
              {touched.telefone && errors.telefone && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">⚠ {errors.telefone}</p>
              )}
            </div>

            <div>
              <label htmlFor="racaPreferida" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Raça Preferida <span className="text-red-500">*</span>
              </label>
              <select
                id="racaPreferida"
                name="racaPreferida"
                value={formData.racaPreferida}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                  touched.racaPreferida && errors.racaPreferida ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">-- Selecione uma raça --</option>
                {racas.map((raca) => (
                  <option key={raca} value={raca}>{raca}</option>
                ))}
              </select>
              {touched.racaPreferida && errors.racaPreferida && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">⚠ {errors.racaPreferida}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Faixa Etária <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {idades.map((idade) => (
                  <label
                    key={idade}
                    className={`relative cursor-pointer ${
                      formData.idade === idade
                        ? 'ring-2 ring-amber-500 border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-300'
                    } border rounded-lg p-3 transition-colors`}
                  >
                    <input
                      type="radio"
                      name="idade"
                      value={idade}
                      checked={formData.idade === idade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium text-gray-700">{idade}</span>
                  </label>
                ))}
              </div>
              {touched.idade && errors.idade && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">⚠ {errors.idade}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Experiência com Gatos <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {experiencias.map((exp) => (
                  <label
                    key={exp.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.experiencia === exp.value
                        ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500'
                        : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="experiencia"
                      value={exp.value}
                      checked={formData.experiencia === exp.value}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                    />
                    <span className="text-sm text-gray-700">{exp.label}</span>
                  </label>
                ))}
              </div>
              {touched.experiencia && errors.experiencia && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">⚠ {errors.experiencia}</p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="aceiteTermos"
                  checked={formData.aceiteTermos}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-4 h-4 mt-0.5 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                />
                <div className="text-sm text-gray-700">
                  Aceito os <a href="#" className="text-amber-600 hover:underline">Termos de Uso</a> e
                  <a href="#" className="text-amber-600 hover:underline">Política de Privacidade</a>
                  <span className="text-red-500">*</span>
                </div>
              </label>
              {touched.aceiteTermos && errors.aceiteTermos && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">⚠ {errors.aceiteTermos}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed"
            >
              {submitted ? 'Enviando...' : 'Cadastrar'}
            </button>
          </div>
        </form>

        <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📚 Conceitos Aplicados</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Formulário controlado</strong> (value + onChange em todos os inputs)</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Múltiplos useState</strong> (formData, errors, touched, submitted, submitSuccess)</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Validação em tempo real</strong> no blur e no submit</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Feedback visual</strong> (bordas vermelhas/amarelas, mensagens de erro, success state)</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Máscara de telefone</strong> com formatação automática</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Radio buttons estilizados</strong> com seleção visual</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Checkbox de termos</strong> obrigatório</li>
            <li className="flex items-center gap-2"><span className="text-amber-500">✓</span> <strong>Reset do formulário</strong> após sucesso</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FormPage;