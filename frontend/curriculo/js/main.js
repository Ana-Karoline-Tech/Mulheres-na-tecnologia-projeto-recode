//Script para o CRUD de Currículos
    
        // Variável para armazenar os currículos
        let curriculos = JSON.parse(localStorage.getItem('curriculos')) || [];
        let curriculoEditando = null;
        
        // Elementos do DOM
        const formCurriculo = document.getElementById('form-curriculo');
        const tabelaCurriculos = document.getElementById('tabela-curriculos');
        const btnLimpar = document.getElementById('btn-limpar');
        const modalCurriculo = new bootstrap.Modal(document.getElementById('modal-curriculo'));
        const modalBody = document.getElementById('modal-body');
        const btnSalvarEdicao = document.getElementById('btn-salvar-edicao');
        const fotoInput = document.getElementById('foto');
        const fotoPreview = document.getElementById('foto-preview');
        
        // Evento para preview da foto
        fotoInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    fotoPreview.src = event.target.result;
                };
                reader.readAsDataURL(e.target.files[0]);
            }
        });
        
        // Salvar currículo
        formCurriculo.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(formCurriculo);
            const curriculo = {};
            
            for (let [key, value] of formData.entries()) {
                curriculo[key] = value;
            }
            
            // Tratamento da foto
            if (fotoInput.files && fotoInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    curriculo.foto = event.target.result;
                    salvarCurriculo(curriculo);
                };
                reader.readAsDataURL(fotoInput.files[0]);
            } else {
                curriculo.foto = 'assets/user-default.jpg';
                salvarCurriculo(curriculo);
            }
        });
        
        function salvarCurriculo(curriculo) {
            // Adiciona ID e data de cadastro
            curriculo.id = Date.now();
            curriculo.dataCadastro = new Date().toLocaleString();
            
            // Adiciona à lista
            curriculos.push(curriculo);
            
            // Salva no localStorage
            localStorage.setItem('curriculos', JSON.stringify(curriculos));
            
            // Atualiza a tabela
            atualizarTabela();
            
            // Limpa o formulário
            formCurriculo.reset();
            fotoPreview.src = 'assets/user-default.jpg';
            
            // Feedback para o usuário
            alert('Currículo cadastrado com sucesso!');
        }
        
        // Limpar formulário
        btnLimpar.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja limpar o formulário?')) {
                formCurriculo.reset();
                fotoPreview.src = 'assets/user-default.jpg';
            }
        });
        
        // Atualizar tabela de currículos
        function atualizarTabela() {
            tabelaCurriculos.innerHTML = '';
            
            if (curriculos.length === 0) {
                tabelaCurriculos.innerHTML = `
                    <tr>
                        <td colspan="5" class="text-center">Nenhum currículo cadastrado ainda.</td>
                    </tr>
                `;
                return;
            }
            
            curriculos.forEach(curriculo => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><img src="${curriculo.foto}" alt="Foto" style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;"></td>
                    <td>${curriculo.nome}</td>
                    <td>${curriculo.cargo}</td>
                    <td>${curriculo.email}</td>
                    <td>
                        <button class="btn btn-sm btn-primary btn-visualizar" data-id="${curriculo.id}"><i class="bi bi-eye"></i></button>
                        <button class="btn btn-sm btn-warning btn-editar" data-id="${curriculo.id}"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-danger btn-excluir" data-id="${curriculo.id}"><i class="bi bi-trash"></i></button>
                    </td>
                `;
                tabelaCurriculos.appendChild(tr);
            });
            
            // Adiciona eventos aos botões
            document.querySelectorAll('.btn-visualizar').forEach(btn => {
                btn.addEventListener('click', function() {
                    visualizarCurriculo(this.getAttribute('data-id'));
                });
            });
            
            document.querySelectorAll('.btn-editar').forEach(btn => {
                btn.addEventListener('click', function() {
                    editarCurriculo(this.getAttribute('data-id'));
                });
            });
            
            document.querySelectorAll('.btn-excluir').forEach(btn => {
                btn.addEventListener('click', function() {
                    excluirCurriculo(this.getAttribute('data-id'));
                });
            });
        }
        
        // Visualizar currículo
        function visualizarCurriculo(id) {
            const curriculo = curriculos.find(c => c.id == id);
            
            modalBody.innerHTML = `
                <div class="row">
                    <div class="col-md-3 text-center">
                        <img src="${curriculo.foto}" alt="Foto" class="img-thumbnail mb-3" style="max-width: 150px;">
                        <h4>${curriculo.nome}</h4>
                        <h5 class="text-muted">${curriculo.cargo}</h5>
                        <hr>
                        <p><i class="bi bi-envelope"></i> ${curriculo.email}</p>
                        <p><i class="bi bi-phone"></i> ${curriculo.telefone}</p>
                        ${curriculo.endereco ? `<p><i class="bi bi-geo-alt"></i> ${curriculo.endereco}</p>` : ''}
                        ${curriculo.linkedin ? `<p><i class="bi bi-linkedin"></i> <a href="${curriculo.linkedin}" target="_blank">LinkedIn</a></p>` : ''}
                        ${curriculo.github ? `<p><i class="bi bi-github"></i> <a href="${curriculo.github}" target="_blank">GitHub</a></p>` : ''}
                    </div>
                    <div class="col-md-9">
                        <h5 class="border-bottom pb-2">Resumo Profissional</h5>
                        <p>${curriculo.resumo}</p>
                        
                        ${curriculo.experiencia ? `
                        <h5 class="border-bottom pb-2 mt-4">Experiência Profissional</h5>
                        <div style="white-space: pre-line">${curriculo.experiencia}</div>
                        ` : ''}
                        
                        ${curriculo.formacao ? `
                        <h5 class="border-bottom pb-2 mt-4">Formação Acadêmica</h5>
                        <div style="white-space: pre-line">${curriculo.formacao}</div>
                        ` : ''}
                        
                        ${curriculo.cursos ? `
                        <h5 class="border-bottom pb-2 mt-4">Cursos Complementares</h5>
                        <div style="white-space: pre-line">${curriculo.cursos}</div>
                        ` : ''}
                        
                        ${curriculo.habilidades ? `
                        <h5 class="border-bottom pb-2 mt-4">Habilidades Técnicas</h5>
                        <p>${curriculo.habilidades}</p>
                        ` : ''}
                        
                        <div class="mt-4 text-muted small">
                            <p>Cadastrado em: ${curriculo.dataCadastro}</p>
                        </div>
                    </div>
                </div>
            `;
            
            document.getElementById('btn-salvar-edicao').style.display = 'none';
            modalCurriculo.show();
        }
        
        // Editar currículo
        function editarCurriculo(id) {
            curriculoEditando = curriculos.find(c => c.id == id);
            
            modalBody.innerHTML = `
                <form id="form-edicao">
                    <div class="row">
                        <div class="col-md-6">
                            <h5>Informações Pessoais</h5>
                            
                            <div class="mb-3">
                                <label for="editar-foto" class="form-label">Foto</label>
                                <div class="d-flex align-items-center">
                                    <img id="editar-foto-preview" src="${curriculoEditando.foto}" alt="Preview da foto" class="img-thumbnail me-3" style="width: 80px; height: 80px; object-fit: cover;">
                                    <input type="file" class="form-control" id="editar-foto" name="foto" accept="image/*">
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label for="editar-nome" class="form-label">Nome Completo*</label>
                                <input type="text" class="form-control" id="editar-nome" name="nome" value="${curriculoEditando.nome}" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="editar-email" class="form-label">E-mail*</label>
                                <input type="email" class="form-control" id="editar-email" name="email" value="${curriculoEditando.email}" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="editar-telefone" class="form-label">Telefone*</label>
                                <input type="tel" class="form-control" id="editar-telefone" name="telefone" value="${curriculoEditando.telefone}" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="editar-endereco" class="form-label">Endereço</label>
                                <input type="text" class="form-control" id="editar-endereco" name="endereco" value="${curriculoEditando.endereco || ''}">
                            </div>
                            
                            <div class="mb-3">
                                <label for="editar-linkedin" class="form-label">LinkedIn</label>
                                <input type="url" class="form-control" id="editar-linkedin" name="linkedin" value="${curriculoEditando.linkedin || ''}">
                            </div>
                            
                            <div class="mb-3">
                                <label for="editar-github" class="form-label">GitHub</label>
                                <input type="url" class="form-control" id="editar-github" name="github" value="${curriculoEditando.github || ''}">
                            </div>
                        </div>
                        
                        <div class="col-md-6">
                            <h5>Informações Profissionais</h5>
                            
                            <div class="mb-3">
                                <label for="editar-cargo" class="form-label">Cargo Desejado*</label>
                                <input type="text" class="form-control" id="editar-cargo" name="cargo" value="${curriculoEditando.cargo}" required>
                            </div>
                            
                            <div class="mb-3">
                                <label for="editar-resumo" class="form-label">Resumo Profissional*</label>
                                <textarea class="form-control" id="editar-resumo" name="resumo" rows="3" required>${curriculoEditando.resumo}</textarea>
                            </div>
                            
                            <div class="mb-3">
                                <label for="editar-experiencia" class="form-label">Experiência Profissional</label>
                                <textarea class="form-control" id="editar-experiencia" name="experiencia" rows="4">${curriculoEditando.experiencia || ''}</textarea>
                            </div>
                            
                            <div class="mb-3">
                                <label for="editar-formacao" class="form-label">Formação Acadêmica</label>
                                <textarea class="form-control" id="editar-formacao" name="formacao" rows="3">${curriculoEditando.formacao || ''}</textarea>
                            </div>
                            
                            <div class="mb-3">
                                <label for="editar-cursos" class="form-label">Cursos Complementares</label>
                                <textarea class="form-control" id="editar-cursos" name="cursos" rows="3">${curriculoEditando.cursos || ''}</textarea>
                            </div>
                            
                            <div class="mb-3">
                                <label for="editar-habilidades" class="form-label">Habilidades Técnicas</label>
                                <input type="text" class="form-control" id="editar-habilidades" name="habilidades" value="${curriculoEditando.habilidades || ''}">
                            </div>
                        </div>
                    </div>
                </form>
            `;
            
            // Evento para preview da foto na edição
            document.getElementById('editar-foto').addEventListener('change', function(e) {
                if (e.target.files && e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        document.getElementById('editar-foto-preview').src = event.target.result;
                    };
                    reader.readAsDataURL(e.target.files[0]);
                }
            });
            
            document.getElementById('btn-salvar-edicao').style.display = 'block';
            modalCurriculo.show();
        }
        
        // Salvar edição
        btnSalvarEdicao.addEventListener('click', function() {
            if (!curriculoEditando) return;
            
            const formEdicao = document.getElementById('form-edicao');
            const formData = new FormData(formEdicao);
            
            // Atualiza os campos editáveis
            for (let [key, value] of formData.entries()) {
                if (key === 'foto') {
                    if (document.getElementById('editar-foto').files && document.getElementById('editar-foto').files[0]) {
                        const reader = new FileReader();
                        reader.onload = function(event) {
                            curriculoEditando.foto = event.target.result;
                            finalizarEdicao();
                        };
                        reader.readAsDataURL(document.getElementById('editar-foto').files[0]);
                        return;
                    }
                } else {
                    curriculoEditando[key] = value;
                }
            }
            
            finalizarEdicao();
        });
        
        function finalizarEdicao() {
            // Atualiza no localStorage
            localStorage.setItem('curriculos', JSON.stringify(curriculos));
            
            // Atualiza a tabela
            atualizarTabela();
            
            // Fecha o modal
            modalCurriculo.hide();
            
            // Feedback para o usuário
            alert('Currículo atualizado com sucesso!');
        }
        
        // Excluir currículo
        function excluirCurriculo(id) {
            if (confirm('Tem certeza que deseja excluir este currículo?')) {
                curriculos = curriculos.filter(c => c.id != id);
                localStorage.setItem('curriculos', JSON.stringify(curriculos));
                atualizarTabela();
                alert('Currículo excluído com sucesso!');
            }
        }
        
        // Inicializa a tabela ao carregar a página
        document.addEventListener('DOMContentLoaded', function() {
            atualizarTabela();
            
            // Máscara para telefone
            const telefoneInput = document.getElementById('telefone');
            if (telefoneInput) {
                telefoneInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                    e.target.value = value;
                });
            }
        });
  