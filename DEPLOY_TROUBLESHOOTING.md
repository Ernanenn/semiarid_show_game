# Guia de Troubleshooting - Deploy Separado

## Problema: Scores não estão sendo salvos

### Diagnóstico

1. **Verificar se a variável de ambiente está configurada no Netlify:**
   - Acesse o dashboard do Netlify
   - Vá em "Site settings" → "Environment variables"
   - Verifique se existe a variável `VITE_API_URL` com a URL do backend no Render
   - Exemplo: `VITE_API_URL=https://show-semiarido-api.onrender.com`

2. **Verificar se o backend está rodando no Render:**
   - Acesse o dashboard do Render
   - Verifique se o serviço está "Live" (verde)
   - Clique no serviço e veja os logs
   - Teste a URL do backend diretamente: `https://seu-backend.onrender.com/api/health`
   - Deve retornar: `{"status":"ok","database":true,"environment":"production"}`

3. **Verificar CORS no backend:**
   - No Render, vá em "Environment" do serviço backend
   - Verifique se `CLIENT_ORIGIN` está configurado com a URL do Netlify
   - Exemplo: `CLIENT_ORIGIN=https://semiarid-show.netlify.app`
   - Se não estiver, adicione e faça um redeploy

4. **Verificar console do navegador:**
   - Abra o DevTools (F12)
   - Vá na aba "Console"
   - Procure por erros relacionados a:
     - `Failed to fetch`
     - `CORS`
     - `VITE_API_URL`

### Soluções

#### Solução 1: Configurar VITE_API_URL no Netlify

1. No Netlify, vá em "Site settings" → "Environment variables"
2. Clique em "Add variable"
3. Adicione:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://seu-backend.onrender.com` (substitua pela URL real do seu backend)
4. Clique em "Save"
5. Vá em "Deploys" → "Trigger deploy" → "Clear cache and deploy site"

#### Solução 2: Configurar CLIENT_ORIGIN no Render

1. No Render, vá no serviço backend
2. Vá em "Environment"
3. Adicione ou atualize:
   - **Key**: `CLIENT_ORIGIN`
   - **Value**: `https://semiarid-show.netlify.app` (ou sua URL do Netlify)
4. O Render fará um redeploy automaticamente

#### Solução 3: Verificar se o backend está acessível

Teste a API diretamente no navegador ou com curl:

```bash
# Health check
curl https://seu-backend.onrender.com/api/health

# Deve retornar:
# {"status":"ok","database":true,"environment":"production"}
```

Se não funcionar, verifique:
- O serviço está "Live" no Render?
- Há erros nos logs do Render?
- O banco de dados foi inicializado?

### Checklist de Verificação

- [ ] `VITE_API_URL` configurado no Netlify com a URL do backend
- [ ] Backend está "Live" no Render
- [ ] `CLIENT_ORIGIN` configurado no Render com a URL do Netlify
- [ ] `/api/health` retorna status OK
- [ ] Sem erros de CORS no console do navegador
- [ ] Redeploy feito após configurar variáveis de ambiente

### Teste Manual

1. Abra o console do navegador (F12)
2. Execute:
```javascript
fetch('https://seu-backend.onrender.com/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

Se retornar erro, o problema é de conexão/CORS.
Se retornar `{status: "ok"}`, a API está funcionando.

